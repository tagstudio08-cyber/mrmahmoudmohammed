DROP POLICY IF EXISTS "Anyone can insert inquiries" ON public.inquiries;
CREATE POLICY "Anyone can insert valid inquiries" ON public.inquiries
FOR INSERT TO public
WITH CHECK (
  length(trim(student_name)) BETWEEN 2 AND 60
  AND length(trim(city)) BETWEEN 2 AND 60
  AND length(trim(study_type)) BETWEEN 2 AND 80
);