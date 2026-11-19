<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Preserve the supplied desktop and mobile templates as separate React views selected by viewport, with shared money-flow visualization, to retain their different section orders and interactions.
- Centralize imported visual declarations in src/styles.css; React state may supply only dynamic CSS variables.
- Both viewport forms submit through the shared server action to contact_submissions; show receipt only after persistence succeeds, and expose contacts and private attachment downloads only to admins.
- Store inquiry status in contact_submissions and validate allowed values in a shared client-safe module; updates use authenticated admin-checked server functions and RLS so status survives reloads without widening public access.
- Mount the shared loading overlay alongside the viewport-selected page; dismiss it after the logo animation, with a bounded asset-loading fallback, so the existing page remains the destination.
- Share photographic featured-service cards and a canonical service-photo mapping across desktop, mobile, opened details and the money-flow diagram so each service retains the same subject and navigation handlers.
- Render money-flow nodes and connectors as a responsive CSS grid, stacking them on narrow screens and pausing their animations offscreen, to match the supplied layout without horizontal dragging or unnecessary background animation.

- Keep all editable text and image defaults in the CMS catalog; desktop and mobile templates resolve the same content keys to preserve their separate layouts.
- Persist CMS overrides in site_content with admin-only writes and public reads; keep admin membership in user_roles and assign only verified allowlisted accounts to prevent public signup escalation.
- Keep uploaded CMS images in private Storage with scoped read policies and long-lived signed display URLs because workspace policy forbids public buckets.
- Password setup and recovery use Cloud Auth email links and the public reset-password page; never generate or disclose administrator passwords in chat.
