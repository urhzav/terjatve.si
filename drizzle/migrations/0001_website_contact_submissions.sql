CREATE TABLE public.contact_submissions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL,
 email text NOT NULL,
 phone text NOT NULL DEFAULT '',
 service text NOT NULL,
 amount text NOT NULL DEFAULT '',
 message text NOT NULL DEFAULT '',
 attachments jsonb NOT NULL DEFAULT '[]'::jsonb
);
GRANT SELECT ON public.contact_submissions TO authenticated;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY admin_read_contacts ON public.contact_submissions FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE INDEX contact_submissions_created_at_idx ON public.contact_submissions (created_at DESC);
CREATE POLICY admin_read_contact_attachments ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'contact-attachments' AND public.has_role(auth.uid(), 'admin'));