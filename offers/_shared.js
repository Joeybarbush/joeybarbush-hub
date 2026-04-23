// HIPJOY Offer Signup — shared form submission logic
const SUPABASE_URL = 'https://mdbzenhhljwmkdcmtawd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kYnplbmhobGp3bWtkY210YXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NzY2NDUsImV4cCI6MjA5MTI1MjY0NX0.oCKA-Dpk-oxlS18mi-7R3pqA0mif1gM3J5RbDxavgaI';

let sb = null;
try { sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY); } catch(e) { console.error('supabase init failed', e); }

async function submitOffer(e, offerTier) {
  e.preventDefault();
  // honeypot
  const hp = e.target.querySelector('[name="website"]');
  if (hp && hp.value) return;

  const name = (document.getElementById('of-name')?.value || '').trim();
  const email = (document.getElementById('of-email')?.value || '').trim();
  const notes = (document.getElementById('of-notes')?.value || '').trim();
  if (!email) return;

  const btn = document.getElementById('of-submit');
  const err = document.getElementById('of-error');
  if (btn) { btn.disabled = true; btn.textContent = 'sending...'; }
  if (err) err.style.display = 'none';

  if (!sb) {
    if (err) { err.textContent = 'connection unavailable — please try again or email joeybarbush@gmail.com'; err.style.display = 'block'; }
    if (btn) { btn.disabled = false; btn.textContent = 'send signal →'; }
    return;
  }

  const { error } = await sb.from('offer_signups').insert({
    offer_tier: offerTier,
    name: name || null,
    email,
    notes: notes || null,
    source_url: window.location.href,
    user_agent: navigator.userAgent.slice(0, 200)
  });

  if (error) {
    if (err) {
      if (error.code === '23505' || (error.message && error.message.toLowerCase().includes('duplicate'))) {
        err.textContent = 'already received your signal on this tier — Joey will reach back within 48 hours';
      } else {
        err.textContent = 'signal did not land — try again or email joeybarbush@gmail.com';
      }
      err.style.display = 'block';
    }
    if (btn) { btn.disabled = false; btn.textContent = 'send signal →'; }
    return;
  }

  // Success
  const form = document.getElementById('offer-form');
  const success = document.getElementById('of-success');
  if (form) form.style.display = 'none';
  if (success) success.classList.add('show');
}

// Scroll reveal
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
