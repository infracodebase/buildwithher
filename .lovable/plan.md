

## Task: Add Founder Sign-off to "Why I'm Building This" Section

### Analysis
The "Why I'm Building This" section (lines 125-145) currently ends with "And right now, it is uncomfortable." I need to add a subtle founder sign-off block after this final sentence.

### Implementation

Add a sign-off block directly after the last `<p>` element in the SectionBlock, structured as:

1. **Name line (`- Tarak`)**:
   - Use `font-caveat` (already used in `HandwrittenQuote` component)
   - Apply handwritten polish: `rotate(-1.5deg)`, `letter-spacing: 0.04em`, `line-height: 1.2`, `opacity: 0.95`
   - Color: soft blue accent using `text-[hsl(var(--primary)/0.85)]`
   - Slightly larger than title line (text-xl)

2. **Title line (`Co-Founder, Infracodebase`)**:
   - Normal site font (`font-body`)
   - Smaller than name (text-sm)
   - Muted color (`text-muted-foreground`)
   - Tight spacing to name line

3. **Container styling**:
   - `mt-8` margin above to separate from paragraph
   - Left-aligned with paragraph text
   - Subtle, minimal appearance

### Code Location
File: `src/pages/Manifest.tsx`, lines 127-144 (within the `SectionBlock` for "Why I'm Building This")

