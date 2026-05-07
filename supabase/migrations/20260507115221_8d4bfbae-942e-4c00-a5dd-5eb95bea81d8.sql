CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  message TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read reviews"
ON public.reviews FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert reviews"
ON public.reviews FOR INSERT
WITH CHECK (
  length(trim(student_name)) BETWEEN 1 AND 60
  AND length(trim(message)) BETWEEN 1 AND 500
  AND rating BETWEEN 1 AND 5
);

CREATE POLICY "Only admin can delete reviews"
ON public.reviews FOR DELETE
TO authenticated
USING (auth.jwt() ->> 'email' = 'doghmishtaha@gmail.com');