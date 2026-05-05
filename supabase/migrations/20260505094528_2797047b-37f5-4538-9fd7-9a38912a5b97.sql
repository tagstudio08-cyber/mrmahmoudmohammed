CREATE TABLE public.inquiries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  city TEXT NOT NULL,
  study_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read inquiries" ON public.inquiries FOR SELECT USING (true);