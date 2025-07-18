-- Create table for pending admin users
CREATE TABLE public.pending_admins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  requested_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied')),
  approved_by TEXT,
  approved_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on pending_admins
ALTER TABLE public.pending_admins ENABLE ROW LEVEL SECURITY;

-- Policy: Only authenticated users can view pending admins
CREATE POLICY "Authenticated users can view pending admins" 
ON public.pending_admins 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Policy: Anyone can insert their own pending request
CREATE POLICY "Anyone can create pending admin request" 
ON public.pending_admins 
FOR INSERT 
WITH CHECK (true);

-- Policy: Only authenticated users can update pending admins
CREATE POLICY "Authenticated users can update pending admins" 
ON public.pending_admins 
FOR UPDATE 
USING (auth.role() = 'authenticated');