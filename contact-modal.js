(function () {
  if (window.__contactModal) return;
  window.__contactModal = true;
  var css = "\
.cm-overlay{position:fixed;inset:0;z-index:9999;display:none;align-items:center;justify-content:center;padding:24px;background:rgba(5,5,7,.8);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}\
.cm-overlay.is-open{display:flex}\
.cm-box{position:relative;width:100%;max-width:520px;max-height:calc(calc(100vh / var(--vz, 1)) - 48px);overflow-y:auto;scrollbar-width:thin;scrollbar-color:rgba(198,160,107,.55) transparent;background:#0E0E12;border:1px solid rgba(198,160,107,.4);border-radius:16px;padding:30px 30px 26px;color:#EDEDEF;font-family:'Instrument Sans',system-ui,sans-serif;box-shadow:0 0 80px rgba(198,160,107,.08);animation:cm-in .3s cubic-bezier(.2,.7,.2,1)}\
.cm-box::-webkit-scrollbar{width:4px}.cm-box::-webkit-scrollbar-track{background:transparent;margin:14px 0}.cm-box::-webkit-scrollbar-thumb{background:rgba(198,160,107,.55);border-radius:4px}.cm-box::-webkit-scrollbar-thumb:hover{background:#C6A06B}\
@keyframes cm-in{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}\
@media (prefers-reduced-motion:reduce){.cm-box{animation:none}}\
.cm-close{position:absolute;top:16px;right:16px;width:32px;height:32px;border-radius:50%;border:1px solid rgba(198,160,107,.35);background:transparent;color:#B4B4BA;font-size:16px;line-height:1;cursor:pointer;transition:border-color .3s,color .3s}\
.cm-close:hover{color:#fff;border-color:#C6A06B}\
.cm-eyebrow{margin:2px 0 22px;font-size:10px;letter-spacing:.28em;text-transform:uppercase;color:#C6A06B}\
.cm-title{margin:0 0 32px;font-family:'Instrument Serif',serif;font-weight:400;font-size:40px;line-height:1.08;letter-spacing:-.01em;color:#F4F4F6}\
.cm-row{display:grid;grid-template-columns:1fr 1fr;gap:20px}\
.cm-field{margin-bottom:16px}\
.cm-field label{display:block;margin-bottom:4px;font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#8A8A92}\
.cm-field label span{color:#C6A06B}\
.cm-field input,.cm-field textarea{width:100%;box-sizing:border-box;padding:6px 0 8px;background:transparent;border:0;border-bottom:1px solid rgba(255,255,255,.14);border-radius:0;color:#EDEDEF;font:inherit;font-size:14px;font-weight:300;outline:none;transition:border-color .3s}\
.cm-field textarea{min-height:64px;resize:vertical}\
.cm-field input::placeholder,.cm-field textarea::placeholder{color:#5A5A62}\
.cm-field input:focus,.cm-field textarea:focus{border-bottom-color:#C6A06B}\
.cm-consent{display:flex;gap:10px;align-items:flex-start;margin:2px 0 20px;font-size:11.5px;line-height:1.55;color:#8A8A92;font-weight:300;cursor:pointer}\
.cm-consent input{margin-top:1px;width:14px;height:14px;accent-color:#C6A06B;flex-shrink:0}\
.cm-consent a{color:#EDEDEF;text-decoration:underline;text-underline-offset:2px}\
.cm-consent a:hover{color:#C6A06B}\
.cm-submit{display:inline-flex;align-items:center;gap:10px;padding:11px 22px;border-radius:999px;border:1px solid rgba(198,160,107,.5);background:transparent;color:#EDEDEF;font:inherit;font-size:10px;letter-spacing:.24em;text-transform:uppercase;cursor:pointer;transition:border-color .3s,box-shadow .4s,color .3s}\
.cm-submit:hover{border-color:#C6A06B;color:#fff;box-shadow:0 0 40px rgba(198,160,107,.2)}\
.cm-submit:disabled{opacity:.5;cursor:wait}\
.cm-submit:focus-visible,.cm-close:focus-visible{outline:2px solid #C6A06B;outline-offset:3px}\
.cm-status{margin:12px 0 0;font-size:13px;min-height:1.4em;font-weight:300}\
.cm-status.ok{color:#C6A06B}.cm-status.err{color:#E58A7A}\
.cm-hp{position:absolute;left:-9999px}\
@media (max-width:600px){.cm-box{padding:26px 20px 22px}.cm-row{grid-template-columns:1fr;gap:0}}";

  var html = '\
<div class="cm-box" role="dialog" aria-modal="true" aria-label="Start a conversation">\
  <button class="cm-close" type="button" aria-label="Close">&times;</button>\
  <p class="cm-eyebrow">Start a conversation</p>\
  <form id="contactForm" novalidate>\
    <input type="hidden" name="access_key" value="08ebde4d-db5a-4f29-8223-d9bc9f005bf6">\
    <input type="hidden" name="subject" value="New message from ilariafiore.com">\
    <input type="hidden" name="from_name" value="ilariafiore.com">\
    <input type="checkbox" name="botcheck" class="cm-hp" tabindex="-1" autocomplete="off">\
    <div class="cm-row">\
      <div class="cm-field"><label for="cmName">Name <span>*</span></label><input id="cmName" name="name" type="text" placeholder="Your name" required autocomplete="name"></div>\
      <div class="cm-field"><label for="cmOrg">Organisation</label><input id="cmOrg" name="organisation" type="text" placeholder="Company, school or event" autocomplete="organization"></div>\
    </div>\
    <div class="cm-field"><label for="cmEmail">Email <span>*</span></label><input id="cmEmail" name="email" type="email" placeholder="you@organisation.com" required autocomplete="email"></div>\
    <div class="cm-field"><label for="cmMsg">Message <span>*</span></label><textarea id="cmMsg" name="message" placeholder="Tell me about your project or idea." required></textarea></div>\
    <label class="cm-consent"><input type="checkbox" name="privacy_consent" value="yes" required><span>I have read the <a href="/privacy-policy" target="_blank">Privacy Policy</a> and consent to the processing of my personal data to handle this request. *</span></label>\
    <button class="cm-submit" type="submit">Send message <span aria-hidden="true">&rarr;</span></button>\
    <p class="cm-status" role="status" aria-live="polite"></p>\
  </form>\
</div>';

  function setup() {
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var modal = document.createElement('div');
    modal.className = 'cm-overlay'; modal.id = 'contactModal'; modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = html;
    document.body.appendChild(modal);
    var form = modal.querySelector('#contactForm'), status = form.querySelector('.cm-status'), btn = form.querySelector('.cm-submit'), lastFocus = null;

    function openModal() {
      lastFocus = document.activeElement;
      modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      setTimeout(function () { form.querySelector('#cmName').focus(); }, 50);
    }
    function closeModal() {
      modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    window.openContactModal = openModal;

    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-contact]');
      if (t) { e.preventDefault(); openModal(); }
    }, true);
    modal.querySelector('.cm-close').addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal(); });

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      status.className = 'cm-status';
      if (!form.checkValidity()) {
        var bad = form.querySelector(':invalid');
        status.textContent = bad.type === 'checkbox' ? 'Please accept the Privacy Policy to send your message.'
          : (bad.type === 'email' && bad.value) ? 'Please enter a valid email address.' : 'Please fill in all required fields.';
        status.classList.add('err'); bad.focus(); return;
      }
      btn.disabled = true; status.textContent = 'Sending\u2026';
      try {
        var data = Object.fromEntries(new FormData(form));
        data.replyto = data.email;
        var res = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify(data) });
        var json = await res.json();
        if (!json.success) throw new Error(json.message);
        form.reset();
        status.textContent = "Message sent. I'll get back to you soon."; status.classList.add('ok');
        setTimeout(function () { closeModal(); status.textContent = ''; status.className = 'cm-status'; }, 1400);
      } catch (err) {
        status.textContent = 'Message not sent. Try again or write to me directly by email.'; status.classList.add('err');
      } finally { btn.disabled = false; }
    });

    if (location.hash === '#contact') setTimeout(openModal, 400);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup); else setup();
})();
