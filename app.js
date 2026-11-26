const IS_MAC = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
const MOD = IS_MAC ? '⌘' : 'Ctrl';
const DRAFT_STORAGE_KEY = 'lqa-cockpit-draft-v1';

const keys = [
  {
    id: 'hotel.booking.free_cancellation.title',
    source: 'Free cancellation until 24 hours before check-in',
    target: '체크인 24시간 전까지 무료 취소',
    tags: ['UI', 'Marketing', 'Hotel'],
    rationale:
      'The cancellation window is clear, but the Korean target uses a noun phrase where the source sets a deadline. The wording is understandable; the proposed edits are consistency and precision improvements, not a booking-blocking error.',
    why: ['source deadline', 'sibling wording', 'UI title'],
    proposals: [
      {
        severity: 'Minor',
        category: 'Language / Grammar',
        comment: 'The deadline reads more naturally as a completed condition when the noun phrase is turned into a clause.',
        suggestion: '체크인 24시간 전까지 무료로 취소할 수 있습니다',
        from: '무료 취소',
        to: '무료로 취소할 수 있습니다',
      },
      {
        severity: 'Preferential',
        category: 'Language / Consistency',
        comment: 'Sibling hotel keys use “입실” for check-in. Matching that term keeps the property flow consistent.',
        suggestion: '입실 24시간 전까지 무료 취소',
        from: '체크인',
        to: '입실',
      },
    ],
    corpus: [
      { source: 'Free cancellation before check-in', target: '체크인 전 무료 취소', vote: 'useful', corpus: 'correct' },
      { source: 'Cancel for free up to 24 hours before arrival', target: '도착 24시간 전까지 무료 취소', vote: 'useful', corpus: 'correct' },
    ],
    glossary: [
      { term: 'check-in', value: '체크인', level: 'B' },
      { term: 'cancellation', value: '취소', level: 'A' },
    ],
    consistency: { status: 'review', text: '2 sibling keys use “입실” in this hotel flow; this key uses “체크인”.', value: 62 },
  },
  {
    id: 'car.rental.deposit.note',
    source: 'A refundable deposit is required at pick-up',
    target: '픽업 시 보증금이 필요합니다',
    tags: ['UI', 'Car rental'],
    rationale:
      'The target correctly says a deposit is required, but it drops “refundable”. A traveller comparing payment options could miss that the amount is returned. This is a meaning-loss risk; the suggested edit restores the condition.',
    why: ['meaning loss', 'payment condition'],
    proposals: [
      {
        severity: 'Major',
        category: 'Accuracy / Mistranslation',
        comment: '“Refundable” is omitted. The amount is returned after the rental, so the target should state that condition.',
        suggestion: '픽업 시 환불 가능한 보증금이 필요합니다',
      },
    ],
    corpus: [
      { source: 'Refundable deposit required', target: '환불 가능한 보증금이 필요합니다', vote: 'useful', corpus: 'correct' },
    ],
    glossary: [{ term: 'deposit', value: '보증금', level: 'B' }],
    consistency: { status: 'review', text: 'One sibling key states “환불 가능한 보증금”; this key drops the refundability.', value: 54 },
  },
  {
    id: 'transfer.vehicle.waiting.time',
    source: 'The driver will wait up to 60 minutes after landing',
    target: '기사님이 착륙 후 최대 60분까지 기다립니다',
    tags: ['UI', 'Transfer'],
    rationale:
      'The target keeps the 60-minute limit. The main issue is a small grammatical mismatch between the subject and the honorific verb; it does not change the waiting time or the action required.',
    why: ['honorific agreement', 'timing preserved'],
    proposals: [
      {
        severity: 'Minor',
        category: 'Language / Grammar',
        comment: 'The honorific subject “기사님” should take “기다리십니다” in this sentence.',
        suggestion: '기사님이 착륙 후 최대 60분까지 기다리십니다',
      },
    ],
    corpus: [
      { source: 'The driver waits up to 60 minutes', target: '기사님이 최대 60분까지 기다립니다', vote: 'useful', corpus: 'correct' },
    ],
    glossary: [],
    consistency: { status: 'ok', text: 'No conflicting timing or pickup rule found in sibling keys.', value: 88 },
  },
  {
    id: 'flight.baggage.cabin_limit.desc',
    source: 'One cabin bag up to 7 kg',
    target: '기내 가방 1개, 최대 7kg',
    tags: ['UI', 'Flight'],
    rationale:
      'The one-bag and 7 kg limits are both present. “기내 가방” is understandable, but the airline flow consistently uses “기내 수하물” for the official cabin allowance.',
    why: ['consistency', 'limit preserved'],
    proposals: [
      {
        severity: 'Preferential',
        category: 'Language / Consistency',
        comment: 'The flight flow uses “기내 수하물” for the official allowance; “기내 가방” reads more like a personal item.',
        suggestion: '기내 수하물 1개, 최대 7kg',
      },
    ],
    corpus: [
      { source: 'One cabin bag up to 7 kg', target: '기내 수하물 1개, 최대 7kg', vote: 'useful', corpus: 'correct' },
    ],
    glossary: [{ term: 'cabin baggage', value: '기내 수하물', level: 'B' }],
    consistency: { status: 'review', text: '3 sibling baggage keys use “기내 수하물”; this key uses “기내 가방”.', value: 71 },
  },
  {
    id: 'cruise.checkin.arrival.time',
    source: 'Please arrive 30 minutes before departure',
    target: '출발 30분 전에 도착해 주세요',
    tags: ['UI', 'Cruise'],
    rationale:
      'The time requirement is intact. The target uses “도착해 주세요”, which is correct, but the surrounding cruise flow consistently uses “탑승 수속” for check-in instructions.',
    why: ['boarding context', 'timing preserved'],
    proposals: [
      {
        severity: 'Preferential',
        category: 'Language / Readability',
        comment: 'In the cruise check-in flow, “탑승 수속” is clearer than “도착” because travellers need to complete check-in, not merely arrive.',
        suggestion: '출발 30분 전까지 탑승 수속을 완료해 주세요',
      },
    ],
    corpus: [
      { source: 'Arrive 30 minutes before departure', target: '출발 30분 전에 도착해 주세요', vote: 'useful', corpus: 'correct' },
    ],
    glossary: [],
    consistency: { status: 'review', text: 'Nearby cruise keys describe “탑승 수속”; this key describes only arrival.', value: 59 },
  },
  {
    id: 'hotel.amenities.wifi.title',
    source: 'Complimentary Wi-Fi',
    target: '무료 Wi-Fi',
    tags: ['UI', 'Hotel'],
    rationale:
      '“Complimentary” is correctly rendered as “무료”. The target is concise, natural, and preserves the amenity meaning. No objective defect found.',
    why: ['clean', 'glossary match'],
    proposals: [],
    corpus: [{ source: 'Free Wi-Fi', target: '무료 Wi-Fi', vote: 'useful', corpus: 'correct' }],
    glossary: [{ term: 'complimentary', value: '무료', level: 'B' }],
    consistency: { status: 'ok', text: 'Matches the hotel amenity naming pattern used by sibling keys.', value: 96 },
  },
  {
    id: 'activity.ticket.validity.note',
    source: 'Valid for 30 days from the date of purchase',
    target: '구매일로부터 30일간 유효',
    tags: ['UI', 'Activity'],
    rationale:
      'The validity period and starting point are both explicit. “30일간 유효” is a natural Korean rendering and no eligibility condition is lost.',
    why: ['clean', 'date condition preserved'],
    proposals: [],
    corpus: [{ source: 'Valid for 30 days from purchase', target: '구매일로부터 30일간 유효', vote: 'useful', corpus: 'correct' }],
    glossary: [],
    consistency: { status: 'ok', text: 'No conflicting validity rule in the activity flow.', value: 94 },
  },
  {
    id: 'insurance.coverage.emergency',
    source: 'Emergency medical coverage included',
    target: '응급 의료 보장 포함',
    tags: ['UI', 'Insurance'],
    rationale:
      'The coverage category and inclusion are both present. “응급 의료 보장” is the established term in the insurance flow; the target is clean.',
    why: ['clean', 'terminology match'],
    proposals: [],
    corpus: [{ source: 'Emergency medical coverage', target: '응급 의료 보장', vote: 'useful', corpus: 'correct' }],
    glossary: [{ term: 'coverage', value: '보장', level: 'B' }],
    consistency: { status: 'ok', text: 'Uses the same coverage term as the sibling insurance keys.', value: 98 },
  },
].map((key) => ({
  ...key,
  proposals: key.proposals.map((proposal) => ({ ...proposal, initialSuggestion: proposal.suggestion })),
  confirmed: false,
  proposalState: {},
  customSuggestion: {},
}));

const state = {
  filter: 'all',
  selectedId: keys[0].id,
  editingIndex: null,
  theme: localStorage.getItem('lqa-theme') || 'light',
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const formatBucket = (bucket) =>
  bucket === 'problem' ? 'Problem' : bucket === 'preferential' ? 'Preferential' : 'Clean';

const bucketOf = (key) => {
  const active = key.proposals.filter((_, index) => key.proposalState[index] !== 'rejected');
  if (active.some((p) => p.severity !== 'Preferential')) return 'problem';
  if (active.length > 0) return 'preferential';
  return 'clean';
};

const isPending = (key) => key.proposals.some((_, index) => !key.proposalState[index]);

const effectiveTarget = (key) => {
  const acceptedIndices = key.proposals
    .map((_, index) => index)
    .filter((index) => key.proposalState[index] === 'accepted');
  if (acceptedIndices.length === 0) return key.target;

  const lastIndex = acceptedIndices[acceptedIndices.length - 1];
  if (key.customSuggestion[lastIndex]) return key.customSuggestion[lastIndex];
  if (acceptedIndices.length === 1) return key.proposals[lastIndex].suggestion;

  let result = key.target;
  for (const index of acceptedIndices) {
    const proposal = key.proposals[index];
    if (key.customSuggestion[index]) {
      result = key.customSuggestion[index];
    } else if (proposal.from && proposal.to && result.includes(proposal.from)) {
      result = result.replace(proposal.from, proposal.to);
    } else {
      result = proposal.suggestion;
    }
  }
  return result;
};

const matchesFilter = (key, filter = state.filter) =>
  filter === 'all' || bucketOf(key) === filter;

const visibleKeys = () =>
  keys.filter((key) => matchesFilter(key) || (key.id === state.selectedId && !key.confirmed));

const selectedKey = () => keys.find((key) => key.id === state.selectedId) || keys[0];

const syncFilterButtons = () => {
  $$('.filter').forEach((item) => item.classList.toggle('is-active', item.dataset.filter === state.filter));
};

const reconcileSelection = () => {
  let items = visibleKeys();
  if (items.length === 0 && state.filter !== 'all') {
    state.filter = 'all';
    syncFilterButtons();
    items = visibleKeys();
  }
  if (items.length > 0 && !items.some((item) => item.id === state.selectedId)) {
    state.selectedId = items[0].id;
  }
};

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

let toastTimer;
const showToast = (message) => {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2600);
};

const counts = () => {
  const all = keys.length;
  const confirmed = keys.filter((key) => key.confirmed).length;
  const problem = keys.filter((key) => bucketOf(key) === 'problem').length;
  const preferential = keys.filter((key) => bucketOf(key) === 'preferential').length;
  return { all, confirmed, problem, preferential, clean: all - problem - preferential };
};

const selectKey = (id) => {
  if (state.selectedId !== id) state.editingIndex = null;
  state.selectedId = id;
  render();
};

const renderQueue = () => {
  const list = $('#keyList');
  const items = visibleKeys();
  list.innerHTML = items
    .map((key) => {
      const bucket = bucketOf(key);
      const isSelected = key.id === state.selectedId;
      return `
        <button class="key-item ${isSelected ? 'is-active' : ''}" data-key="${escapeHtml(key.id)}" data-bucket="${bucket}" type="button" aria-pressed="${isSelected}">
          <span class="status-dot" aria-hidden="true"></span>
          <span>
            <span class="key-name">${escapeHtml(key.id)}${key.confirmed ? '<span class="key-confirmed" aria-label="confirmed">✓</span>' : ''}</span>
            <span class="key-source">${escapeHtml(effectiveTarget(key))}</span>
          </span>
        </button>`;
    })
    .join('');

  $$('.key-item').forEach((item) => {
    item.addEventListener('click', () => selectKey(item.dataset.key));
  });
};

const setProposalDecision = (key, index, decision) => {
  const proposal = key.proposals[index];
  if (!proposal) return;
  key.proposalState[index] = decision;
  state.editingIndex = null;
  render();
  showToast(
    decision === 'accepted'
      ? `AI proposal ${index + 1} accepted — target updated.`
      : `AI proposal ${index + 1} rejected.`,
  );
};

const renderProposals = (key) => {
  const list = $('#proposalList');
  if (key.proposals.length === 0) {
    list.innerHTML = '<div class="empty-state">No AI proposals. This key is ready for a clean confirmation.</div>';
    return;
  }

  list.innerHTML = key.proposals
    .map((proposal, index) => {
      const proposalState = key.proposalState[index] || 'pending';
      const isEditing = state.editingIndex === index;
      return `
        <div class="proposal ${proposalState === 'accepted' ? 'is-accepted' : proposalState === 'rejected' ? 'is-rejected' : ''}">
          <div class="proposal-number" aria-hidden="true">${index + 1}</div>
          <div>
            <div class="proposal-title">
              <span class="proposal-tag ${proposal.severity.toLowerCase()}">${escapeHtml(proposal.severity)}</span>
              ${escapeHtml(proposal.category)}
            </div>
            <div class="proposal-text">${escapeHtml(proposal.comment)}</div>
            ${
              isEditing
                ? `<div class="proposal-edit-row">
                    <input class="proposal-edit-input" type="text" value="${escapeHtml(proposal.suggestion)}" data-edit-input="${index}" aria-label="Edit suggestion ${index + 1}" />
                    <button class="primary-button compact" type="button" data-action="save-edit" data-index="${index}">Apply</button>
                    <button class="ghost-button compact" type="button" data-action="cancel-edit" data-index="${index}">Cancel</button>
                  </div>`
                : `<div class="proposal-suggest">→ ${escapeHtml(proposal.suggestion)}</div>`
            }
          </div>
          <div class="proposal-actions">
            <button class="accept-button tooltip-wrap" type="button" data-action="accept" data-index="${index}" data-tip="Accept proposal (${index + 1})" aria-label="Accept AI proposal ${index + 1}" aria-pressed="${proposalState === 'accepted'}">✓</button>
            <button class="reject-button tooltip-wrap" type="button" data-action="reject" data-index="${index}" data-tip="Reject proposal (⇧+${index + 1})" aria-label="Reject AI proposal ${index + 1}" aria-pressed="${proposalState === 'rejected'}">×</button>
            <button class="edit-button tooltip-wrap" type="button" data-action="edit" data-index="${index}" data-tip="Edit suggestion wording" aria-label="Edit AI proposal ${index + 1}" aria-expanded="${isEditing}">✎</button>
          </div>
        </div>`;
    })
    .join('');

  list.querySelectorAll('[data-action]').forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.index);
      const proposal = key.proposals[index];
      if (!proposal) return;
      const action = button.dataset.action;

      if (action === 'edit') {
        state.editingIndex = state.editingIndex === index ? null : index;
        render();
        const input = list.querySelector(`[data-edit-input="${index}"]`);
        if (input) {
          input.focus();
          input.select();
        }
        return;
      }

      if (action === 'cancel-edit') {
        state.editingIndex = null;
        render();
        return;
      }

      if (action === 'save-edit') {
        const input = list.querySelector(`[data-edit-input="${index}"]`);
        const nextText = input ? input.value.trim() : '';
        if (!nextText) {
          showToast('Suggestion text cannot be empty.');
          return;
        }
        proposal.suggestion = nextText;
        key.customSuggestion[index] = nextText;
        key.proposalState[index] = 'accepted';
        state.editingIndex = null;
        render();
        showToast(`Proposal ${index + 1} updated and accepted.`);
        return;
      }

      setProposalDecision(key, index, action === 'accept' ? 'accepted' : 'rejected');
    });
  });

  list.querySelectorAll('[data-edit-input]').forEach((input) => {
    input.addEventListener('keydown', (event) => {
      const index = Number(input.dataset.editInput);
      if (event.key === 'Enter') {
        event.preventDefault();
        list.querySelector(`[data-action="save-edit"][data-index="${index}"]`)?.click();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        state.editingIndex = null;
        render();
      }
    });
  });
};

const renderEvidence = (key) => {
  const bucket = bucketOf(key);
  $('#decisionLabel').textContent = formatBucket(bucket);
  $('#rationaleText').textContent = key.rationale;
  $('#rationaleFoot').innerHTML = key.why.map((item) => `<span class="why-chip">${escapeHtml(item)}</span>`).join('');

  const highSignal = key.consistency.value >= 75 || key.glossary.length > 0;
  const signalBadge = $('#signalBadge');
  signalBadge.textContent = highSignal ? '● High signal' : '● Context review';
  signalBadge.classList.toggle('is-review', !highSignal);
  signalBadge.setAttribute('aria-label', highSignal ? 'AI confidence high' : 'AI confidence requires context review');

  $('#corpusCount').textContent = `${key.corpus.length} ${key.corpus.length === 1 ? 'row' : 'rows'}`;
  $('#corpusList').innerHTML = key.corpus
    .map(
      (row) => `
        <div class="corpus-row">
          <span class="corpus-source">${escapeHtml(row.source)}</span>
          <span class="corpus-target">${escapeHtml(row.target)}</span>
          <div class="vote-row">
            ${row.vote ? `<span class="vote ${escapeHtml(row.vote)}">👍 ${escapeHtml(row.vote)}</span>` : ''}
            ${row.corpus ? `<span class="vote ${escapeHtml(row.corpus)}">✓ ${escapeHtml(row.corpus)}</span>` : ''}
          </div>
        </div>`,
    )
    .join('');
  $('#glossaryList').innerHTML =
    key.glossary.length > 0
      ? key.glossary
          .map(
            (row) => `
          <div class="glossary-row">
            <span class="glossary-term">${escapeHtml(row.term)}</span>
            <span class="glossary-value">${escapeHtml(row.value)} <span class="glossary-level">${escapeHtml(row.level)}</span></span>
          </div>`,
          )
          .join('')
      : '<div class="empty-state">No glossary match for this key.</div>';
  $('#consistencyStatus').textContent = key.consistency.status === 'ok' ? 'OK' : 'Review';
  $('#consistencyStatus').classList.toggle('ok', key.consistency.status === 'ok');
  $('#consistencyText').textContent = key.consistency.text;
  $('#consistencyBar').style.width = `${key.consistency.value}%`;
};

const captureFocusState = () => {
  const active = document.activeElement;
  if (!active) return null;
  if (active.matches('.key-item[data-key]')) {
    return { type: 'queue' };
  }
  if (active.matches('#proposalList [data-action][data-index]')) {
    return { type: 'proposal', action: active.dataset.action, index: active.dataset.index };
  }
  return null;
};

const restoreFocusState = (focusState) => {
  if (!focusState) return;
  if (focusState.type === 'queue') {
    const activeItem = $(`.key-item[data-key="${CSS.escape(state.selectedId)}"]`);
    activeItem?.focus();
    activeItem?.scrollIntoView({ block: 'nearest' });
  } else if (focusState.type === 'proposal') {
    const button = $(`#proposalList [data-action="${focusState.action}"][data-index="${focusState.index}"]`);
    button?.focus();
  }
};

const render = () => {
  const focusState = captureFocusState();
  reconcileSelection();

  const key = selectedKey();
  const bucket = bucketOf(key);
  const currentItems = visibleKeys();
  const keyIndex = currentItems.findIndex((item) => item.id === key.id);
  const displayIndex = keyIndex >= 0 ? keyIndex + 1 : 1;
  const total = currentItems.length;
  const stat = counts();
  const progress = Math.round((stat.confirmed / stat.all) * 100);
  const updatedTarget = effectiveTarget(key);
  const isTargetUpdated = updatedTarget !== key.target;
  const pending = isPending(key);

  $('#navCount').textContent = String(stat.all);
  $('#countAll').textContent = String(stat.all);
  $('#countProblem').textContent = String(stat.problem);
  $('#countPref').textContent = String(stat.preferential);
  $('#countClean').textContent = String(stat.clean);
  $('#statProblem').textContent = String(stat.problem);
  $('#statPref').textContent = String(stat.preferential);
  $('#statConfirmed').textContent = String(stat.confirmed);
  $('#progressText').textContent = `${stat.confirmed} / ${stat.all} confirmed`;
  $('#progressPct').textContent = `${progress}%`;
  $('#progressBar').style.width = `${progress}%`;
  $('#breadcrumbKey').textContent = key.id;
  $('#keyIndex').textContent = `${displayIndex} / ${total}`;
  $('#keyName').textContent = key.id;
  $('#sourceText').textContent = key.source;
  $('#targetText').textContent = updatedTarget;
  $('#targetBlock').classList.toggle('is-updated', isTargetUpdated);
  $('#targetUpdatedBadge').hidden = !isTargetUpdated;
  $('#targetOriginal').hidden = !isTargetUpdated;
  $('#targetOriginal').textContent = isTargetUpdated ? `Original: ${key.target}` : '';

  $('#metaRow').innerHTML = key.tags.map((tag) => `<span class="meta-chip">${escapeHtml(tag)}</span>`).join('');
  $('#keyBucket').textContent = formatBucket(bucket);
  $('#keyBucket').className = `severity-badge ${bucket}`;
  $('#keyStatus').textContent = key.confirmed ? 'Confirmed' : 'Unconfirmed';
  $('#keyStatus').className = `status-badge ${key.confirmed ? 'confirmed' : ''}`;
  $('#confirmKey').disabled = key.confirmed || pending;
  $('#confirmTooltip').setAttribute(
    'data-tip',
    key.confirmed
      ? 'This key is already confirmed'
      : pending
        ? 'Accept or reject all AI proposals before confirming'
        : `Confirm this key (${MOD}+Enter) and jump to the next unconfirmed key`,
  );
  $('#prevKey').disabled = displayIndex <= 1;
  $('#nextKey').disabled = displayIndex >= total;

  const allConfirmed = stat.confirmed === stat.all;
  $('#completionBanner').hidden = !allConfirmed;
  if (allConfirmed) {
    $('#completionSummary').textContent = `${stat.problem} problem · ${stat.preferential} preferential · ${stat.clean} clean finalized.`;
  }

  renderQueue();
  renderProposals(key);
  renderEvidence(key);
  restoreFocusState(focusState);
};

const selectRelative = (offset) => {
  const items = visibleKeys();
  const current = items.findIndex((item) => item.id === state.selectedId);
  const next = items[Math.max(0, Math.min(items.length - 1, current + offset))];
  if (next && next.id !== state.selectedId) {
    selectKey(next.id);
    $(`.key-item[data-key="${CSS.escape(state.selectedId)}"]`)?.scrollIntoView({ block: 'nearest' });
  }
};

const nextUnconfirmed = () => {
  const items = keys.filter((key) => matchesFilter(key));
  const current = items.findIndex((item) => item.id === state.selectedId);
  const ordered =
    current >= 0 ? [...items.slice(current + 1), ...items.slice(0, current)] : items;
  return ordered.find((item) => !item.confirmed && item.id !== state.selectedId) || null;
};

const confirmKey = () => {
  const key = selectedKey();
  if (key.confirmed) return;
  if (isPending(key)) {
    showToast('Accept or reject all AI proposals first.');
    return;
  }
  const bucket = bucketOf(key);
  const next = nextUnconfirmed() || keys.find((item) => !item.confirmed && item.id !== key.id) || null;
  key.confirmed = true;
  state.editingIndex = null;
  if (next) {
    if (!matchesFilter(next)) {
      state.filter = 'all';
      syncFilterButtons();
    }
    state.selectedId = next.id;
  }
  render();
  const stat = counts();
  if (stat.confirmed === stat.all) {
    showToast(`Confirmed as ${formatBucket(bucket)} — all ${stat.all} keys complete.`);
  } else {
    showToast(`Confirmed as ${formatBucket(bucket)}${next ? ' — moved to next unconfirmed key.' : '.'}`);
  }
};

const saveDraft = () => {
  const payload = {
    filter: state.filter,
    selectedId: state.selectedId,
    keys: keys.map((key) => ({
      id: key.id,
      confirmed: key.confirmed,
      proposalState: key.proposalState,
      customSuggestion: key.customSuggestion,
    })),
  };
  try {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(payload));
    const stat = counts();
    showToast(`Draft saved locally (${stat.confirmed}/${stat.all} confirmed).`);
  } catch {
    showToast('Local storage is unavailable in this preview.');
  }
};

const loadDraft = () => {
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (saved && Array.isArray(saved.keys)) {
      for (const entry of saved.keys) {
        const targetKey = keys.find((item) => item.id === entry.id);
        if (!targetKey) continue;
        targetKey.confirmed = Boolean(entry.confirmed);
        targetKey.proposalState = entry.proposalState && typeof entry.proposalState === 'object' ? { ...entry.proposalState } : {};
        targetKey.customSuggestion =
          entry.customSuggestion && typeof entry.customSuggestion === 'object' ? { ...entry.customSuggestion } : {};
        Object.entries(targetKey.customSuggestion).forEach(([idx, text]) => {
          if (targetKey.proposals[Number(idx)] && typeof text === 'string') {
            targetKey.proposals[Number(idx)].suggestion = text;
          }
        });
      }
    }
    if (typeof saved?.filter === 'string') state.filter = saved.filter;
    if (typeof saved?.selectedId === 'string') state.selectedId = saved.selectedId;
    syncFilterButtons();
  } catch {
    // Ignore malformed saved state
  }
};

const resetDemo = () => {
  keys.forEach((key) => {
    key.confirmed = false;
    key.proposalState = {};
    key.customSuggestion = {};
    key.proposals.forEach((proposal) => {
      proposal.suggestion = proposal.initialSuggestion;
    });
  });
  state.filter = 'all';
  state.selectedId = keys[0].id;
  state.editingIndex = null;
  syncFilterButtons();
  try {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  } catch {
    // Ignore storage removal errors
  }
  render();
  showToast('Demo reset to initial state.');
};

$$('.filter').forEach((button) => {
  button.addEventListener('click', () => {
    state.filter = button.dataset.filter;
    state.editingIndex = null;
    syncFilterButtons();
    const items = keys.filter((key) => matchesFilter(key));
    if (items.length > 0 && !items.some((item) => item.id === state.selectedId)) {
      state.selectedId = items[0].id;
    }
    render();
  });
});

$$('[data-soon]').forEach((button) => {
  button.addEventListener('click', () => showToast(button.dataset.soon));
});

$$('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const key = selectedKey();
    const text = button.dataset.copy === 'source' ? key.source : effectiveTarget(key);
    try {
      await navigator.clipboard.writeText(text);
      showToast('Copied to clipboard.');
    } catch {
      showToast('Clipboard access is unavailable in this preview.');
    }
  });
});

$('#prevKey').addEventListener('click', () => selectRelative(-1));
$('#nextKey').addEventListener('click', () => selectRelative(1));
$('#confirmKey').addEventListener('click', confirmKey);
$('#saveDraft').addEventListener('click', saveDraft);
$('#resetDemo').addEventListener('click', resetDemo);
$('#resetFromBanner').addEventListener('click', resetDemo);

const themeToggle = $('#themeToggle');
const applyTheme = () => {
  document.body.dataset.theme = state.theme;
  $('#themeIcon').textContent = state.theme === 'dark' ? '☀' : '☾';
};
themeToggle.addEventListener('click', () => {
  state.theme = state.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('lqa-theme', state.theme);
  applyTheme();
});

document.addEventListener('keydown', (event) => {
  const target = event.target;
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target?.isContentEditable) return;
  const modifier = IS_MAC ? event.metaKey : event.ctrlKey;
  const key = selectedKey();

  if (modifier && event.key === 'Enter') {
    event.preventDefault();
    confirmKey();
    return;
  }

  const digitMatch = /^Digit([1-9])$/.exec(event.code) || (/^[1-9]$/.test(event.key) ? [null, event.key] : null);
  if (digitMatch) {
    const index = Number(digitMatch[1]) - 1;
    const proposal = key.proposals[index];
    if (!proposal) return;

    if (event.shiftKey && !event.metaKey && !event.ctrlKey && !event.altKey) {
      event.preventDefault();
      setProposalDecision(key, index, 'rejected');
      return;
    }

    if (!event.shiftKey) {
      event.preventDefault();
      setProposalDecision(key, index, 'accepted');
      return;
    }
  }

  if (!modifier && !event.altKey && (event.key === 'j' || event.key === 'ArrowDown')) {
    event.preventDefault();
    selectRelative(1);
  } else if (!modifier && !event.altKey && (event.key === 'k' || event.key === 'ArrowUp')) {
    event.preventDefault();
    selectRelative(-1);
  }
});

$('#modKey2').textContent = MOD;
$('#confirmShortcut').textContent = `${MOD}↵`;

loadDraft();
applyTheme();
render();
