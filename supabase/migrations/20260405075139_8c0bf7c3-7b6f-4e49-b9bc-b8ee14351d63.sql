
-- Prevent users from manipulating claim_status on INSERT or UPDATE
CREATE OR REPLACE FUNCTION public.enforce_claim_status()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Force claim_status to 'claimed' for user-created profiles
    NEW.claim_status := 'claimed';
  ELSIF TG_OP = 'UPDATE' THEN
    -- Preserve existing claim_status; users cannot change it
    NEW.claim_status := OLD.claim_status;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_enforce_claim_status
  BEFORE INSERT OR UPDATE ON public.builders
  FOR EACH ROW
  EXECUTE FUNCTION public.enforce_claim_status();
