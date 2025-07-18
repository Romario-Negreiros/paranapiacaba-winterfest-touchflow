import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LogOut, Eye, Users, Calendar } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  protocol_number: string;
  full_name: string;
  cpf: string;
  email: string;
  visit_date: string;
  created_at: string;
}

interface PendingAdmin {
  id: string;
  email: string;
  full_name: string | null;
  requested_at: string;
  status: string;
  approved_by: string | null;
  approved_at: string | null;
}

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(false);
  const [pendingAdmins, setPendingAdmins] = useState<PendingAdmin[]>([]);
  const [loadingPendingAdmins, setLoadingPendingAdmins] = useState(false);
  const [isAuthorizedAdmin, setIsAuthorizedAdmin] = useState(false);
  const [checkingAuthorization, setCheckingAuthorization] = useState(true);
  
  // Auth form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  
  const { toast } = useToast();

  // Function to check if user is authorized admin
  const checkAdminAuthorization = async (userEmail: string) => {
    setCheckingAuthorization(true);
    
    // Always allow admin@festival.com
    if (userEmail === 'admin@festival.com') {
      setIsAuthorizedAdmin(true);
      setCheckingAuthorization(false);
      return true;
    }

    try {
      // Check if user is approved in pending_admins
      const { data, error } = await supabase
        .from('pending_admins')
        .select('status')
        .eq('email', userEmail)
        .eq('status', 'approved')
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
        console.error('Error checking admin authorization:', error);
        setIsAuthorizedAdmin(false);
        setCheckingAuthorization(false);
        return false;
      } else if (data) {
        setIsAuthorizedAdmin(true);
        setCheckingAuthorization(false);
        return true;
      } else {
        setIsAuthorizedAdmin(false);
        setCheckingAuthorization(false);
        return false;
      }
    } catch (error) {
      console.error('Error checking admin authorization:', error);
      setIsAuthorizedAdmin(false);
      setCheckingAuthorization(false);
      return false;
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
        
        if (session?.user) {
          const isAuthorized = await checkAdminAuthorization(session.user.email!);
          
          // Load data if user is authorized
          if (isAuthorized || session.user.email === 'admin@festival.com') {
            setTimeout(() => {
              loadBookings();
              // Only load pending admins for main admin
              if (session.user.email === 'admin@festival.com') {
                loadPendingAdmins();
              }
            }, 0);
          }
        } else {
          setIsAuthorizedAdmin(false);
          setCheckingAuthorization(false);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
      
      if (session?.user) {
        const isAuthorized = await checkAdminAuthorization(session.user.email!);
        
        if (isAuthorized || session.user.email === 'admin@festival.com') {
          setTimeout(() => {
            loadBookings();
            // Only load pending admins for main admin
            if (session.user.email === 'admin@festival.com') {
              loadPendingAdmins();
            }
          }, 0);
        }
      } else {
        setIsAuthorizedAdmin(false);
        setCheckingAuthorization(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadBookings = async () => {
    setLoadingBookings(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Erro",
          description: "Erro ao carregar agendamentos: " + error.message,
          variant: "destructive",
        });
      } else {
        setBookings(data || []);
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro inesperado ao carregar dados",
        variant: "destructive",
      });
    } finally {
      setLoadingBookings(false);
    }
  };

  const loadPendingAdmins = async () => {
    setLoadingPendingAdmins(true);
    try {
      const { data, error } = await supabase
        .from('pending_admins')
        .select('*')
        .eq('status', 'pending')
        .order('requested_at', { ascending: false });

      if (error) {
        toast({
          title: "Erro",
          description: "Erro ao carregar solicitações pendentes: " + error.message,
          variant: "destructive",
        });
      } else {
        setPendingAdmins(data || []);
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro inesperado ao carregar solicitações",
        variant: "destructive",
      });
    } finally {
      setLoadingPendingAdmins(false);
    }
  };

  const handleAdminAction = async (adminId: string, action: 'approved' | 'denied') => {
    try {
      const { error } = await supabase
        .from('pending_admins')
        .update({
          status: action,
          approved_by: user?.email,
          approved_at: new Date().toISOString()
        })
        .eq('id', adminId);

      if (error) {
        toast({
          title: "Erro",
          description: "Erro ao atualizar solicitação: " + error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: action === 'approved' ? "Solicitação Aprovada" : "Solicitação Negada",
          description: `A solicitação foi ${action === 'approved' ? 'aprovada' : 'negada'} com sucesso.`,
        });
        loadPendingAdmins(); // Recarregar a lista
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro inesperado ao processar solicitação",
        variant: "destructive",
      });
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);

    try {
      if (isSignUp) {
        // Primeiro registra a solicitação na tabela pending_admins
        const { error: pendingError } = await supabase
          .from('pending_admins')
          .insert({
            email,
            full_name: fullName || null
          });

        if (pendingError) {
          toast({
            title: "Erro na solicitação",
            description: pendingError.message,
            variant: "destructive",
          });
          return;
        }

        const redirectUrl = `${window.location.origin}/admin`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl
          }
        });

        if (error) {
          toast({
            title: "Erro no cadastro",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Solicitação Enviada!",
            description: "Sua solicitação de acesso foi enviada para aprovação. Verifique seu email para confirmar a conta.",
          });
          // Limpar o formulário
          setEmail("");
          setPassword("");
          setFullName("");
          setIsSignUp(false);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast({
            title: "Erro no login",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Login realizado!",
            description: "Bem-vindo à área administrativa.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro inesperado durante autenticação",
        variant: "destructive",
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  if (isLoading || checkingAuthorization) {
    return (
      <div className="min-h-screen bg-gradient-ice flex items-center justify-center">
        <div className="text-2xl text-primary">
          {isLoading ? "Carregando..." : "Verificando permissões..."}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-ice flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-primary">
              {isSignUp ? "Criar Conta Admin" : "Login Administrativo"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAuth} className="space-y-4">
              {isSignUp && (
                <div>
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="mt-1"
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@festival.com"
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-1"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isAuthenticating}
              >
                {isAuthenticating 
                  ? "Processando..." 
                  : isSignUp 
                    ? "Criar Conta" 
                    : "Entrar"
                }
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-primary hover:underline text-sm"
                >
                  {isSignUp 
                    ? "Já tem uma conta? Fazer login" 
                    : "Não tem conta? Criar nova conta"
                  }
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check if user is authorized admin
  if (user && !isAuthorizedAdmin) {
    return (
      <div className="min-h-screen bg-gradient-ice flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-destructive">Acesso Negado</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Sua solicitação de acesso ainda não foi aprovada pelo administrador principal.
            </p>
            <p className="text-sm text-muted-foreground">
              Aguarde a aprovação ou entre em contato com o administrador.
            </p>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Fazer Logout
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-ice p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Painel Administrativo</h1>
            <p className="text-muted-foreground">Festival de Inverno de Paranapiacaba</p>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="px-3 py-1">
              <Users className="w-4 h-4 mr-1" />
              {user.email}
            </Badge>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total de Agendamentos</p>
                  <p className="text-3xl font-bold text-primary">{bookings.length}</p>
                </div>
                <Calendar className="w-10 h-10 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hoje</p>
                  <p className="text-3xl font-bold text-primary">
                    {bookings.filter(b => 
                      format(new Date(b.visit_date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
                    ).length}
                  </p>
                </div>
                <Eye className="w-10 h-10 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Esta Semana</p>
                  <p className="text-3xl font-bold text-primary">
                    {bookings.filter(b => {
                      const bookingDate = new Date(b.visit_date);
                      const today = new Date();
                      const weekStart = new Date(today.setDate(today.getDate() - today.getDay()));
                      return bookingDate >= weekStart;
                    }).length}
                  </p>
                </div>
                <Users className="w-10 h-10 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Admins Section - Only for main admin */}
        {user?.email === 'admin@festival.com' && pendingAdmins.length > 0 && (
          <Card className="shadow-card mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl text-orange-600">
                  Solicitações de Acesso Pendentes ({pendingAdmins.length})
                </CardTitle>
                <Button variant="outline" onClick={loadPendingAdmins} disabled={loadingPendingAdmins}>
                  {loadingPendingAdmins ? "Carregando..." : "Atualizar"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Solicitado em</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingAdmins.map((admin) => (
                      <TableRow key={admin.id}>
                        <TableCell className="font-medium">
                          {admin.full_name || "Não informado"}
                        </TableCell>
                        <TableCell>{admin.email}</TableCell>
                        <TableCell>
                          {format(new Date(admin.requested_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => handleAdminAction(admin.id, 'approved')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Aprovar
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleAdminAction(admin.id, 'denied')}
                            >
                              Negar
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bookings Table */}
        <Card className="shadow-card">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Agendamentos Recentes</CardTitle>
              <Button variant="outline" onClick={loadBookings} disabled={loadingBookings}>
                {loadingBookings ? "Carregando..." : "Atualizar"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum agendamento encontrado
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Protocolo</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>CPF</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Data da Visita</TableHead>
                      <TableHead>Agendado em</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-mono">
                          {booking.protocol_number}
                        </TableCell>
                        <TableCell className="font-medium">
                          {booking.full_name}
                        </TableCell>
                        <TableCell>{booking.cpf}</TableCell>
                        <TableCell>{booking.email}</TableCell>
                        <TableCell>
                          {format(new Date(booking.visit_date), "dd/MM/yyyy", { locale: ptBR })}
                        </TableCell>
                        <TableCell>
                          {format(new Date(booking.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}