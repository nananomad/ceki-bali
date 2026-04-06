// ================================================================
// CEKI Game v1 — Game Logic
// Human Player (P2) vs AI
// ================================================================

// ================================================================
// CEKI Simulator v11 — Game Logic
// Traditional Balinese Card Game
// ================================================================

// ================================================================
// CARD DATA
// ================================================================
const CARDS_DEF = [
  { id:'WR',  name:'Wong Raja',  type:'honours', value:0 },
  { id:'CN',  name:'Cina',       type:'honours', value:0 },
  { id:'KN',  name:'Kunci',      type:'honours', value:0 },
  { id:'LK',  name:'Likas',      type:'coins',   value:1 },
  { id:'JD',  name:'Jebug Dua',  type:'coins',   value:2 },
  { id:'JT',  name:'Jebug Telu', type:'coins',   value:3 },
  { id:'PY',  name:'Piyag',      type:'coins',   value:4 },
  { id:'PA',  name:'Pau',        type:'coins',   value:5 },
  { id:'PN',  name:'Pis Nem',    type:'coins',   value:6 },
  { id:'PT',  name:'Pis Tu',     type:'coins',   value:7 },
  { id:'PTS', name:'Pis Tus',    type:'coins',   value:8 },
  { id:'SG',  name:'Sanga',      type:'coins',   value:9 },
  { id:'LJ',  name:'Lojor',      type:'strings', value:1 },
  { id:'SK',  name:'Sengkek',    type:'strings', value:2 },
  { id:'GN',  name:'Gunung',     type:'strings', value:3 },
  { id:'BB',  name:'Bebed',      type:'strings', value:4 },
  { id:'PL',  name:'Palu',       type:'strings', value:5 },
  { id:'KL',  name:'Klenteng',   type:'strings', value:6 },
  { id:'RY',  name:'Rinying',    type:'strings', value:7 },
  { id:'UL',  name:'Ulu',        type:'strings', value:8 },
  { id:'BS',  name:'Besar',      type:'strings', value:9 },
  { id:'CK',  name:'Cakra',       type:'myriads', value:1 },
  { id:'PK',  name:'Pelik',      type:'myriads', value:2 },
  { id:'CL',  name:'Caling',     type:'myriads', value:3 },
  { id:'KB',  name:'Kobong',     type:'myriads', value:4 },
  { id:'BK',  name:'Bongkar',    type:'myriads', value:5 },
  { id:'BR',  name:'Burat',      type:'myriads', value:6 },
  { id:'RG',  name:'Ringgit',    type:'myriads', value:7 },
  { id:'MN',  name:'Manak',      type:'myriads', value:8 },
  { id:'SM',  name:'Semi',       type:'myriads', value:9 },
];


// ================================================================
// CARD IMAGES — GitHub Pages
// ================================================================
const CARD_IMAGES = {
  'WR': 'https://nananomad.github.io/ceki-bali/images/honours-1.jpeg',
  'CN': 'https://nananomad.github.io/ceki-bali/images/honours-2.jpeg',
  'KN': 'https://nananomad.github.io/ceki-bali/images/honours-3.jpeg',
  'LK': 'https://nananomad.github.io/ceki-bali/images/coins-1.jpeg',
  'JD': 'https://nananomad.github.io/ceki-bali/images/coins-2.jpeg',
  'JT': 'https://nananomad.github.io/ceki-bali/images/coins-3.jpeg',
  'PY': 'https://nananomad.github.io/ceki-bali/images/coins-4.jpeg',
  'PA': 'https://nananomad.github.io/ceki-bali/images/coins-5.jpeg',
  'PN': 'https://nananomad.github.io/ceki-bali/images/coins-6.jpeg',
  'PT': 'https://nananomad.github.io/ceki-bali/images/coins-7.jpeg',
  'PTS': 'https://nananomad.github.io/ceki-bali/images/coins-8.jpeg',
  'SG': 'https://nananomad.github.io/ceki-bali/images/coins-9.jpeg',
  'LJ': 'https://nananomad.github.io/ceki-bali/images/strings-1.jpeg',
  'SK': 'https://nananomad.github.io/ceki-bali/images/strings-2.jpeg',
  'GN': 'https://nananomad.github.io/ceki-bali/images/strings-3.jpeg',
  'BB': 'https://nananomad.github.io/ceki-bali/images/strings-4.jpeg',
  'PL': 'https://nananomad.github.io/ceki-bali/images/strings-5.jpeg',
  'KL': 'https://nananomad.github.io/ceki-bali/images/strings-6.jpeg',
  'RY': 'https://nananomad.github.io/ceki-bali/images/strings-7.jpeg',
  'UL': 'https://nananomad.github.io/ceki-bali/images/strings-8.jpeg',
  'BS': 'https://nananomad.github.io/ceki-bali/images/strings-9.jpeg',
  'CK': 'https://nananomad.github.io/ceki-bali/images/myriads-1.jpeg',
  'PK': 'https://nananomad.github.io/ceki-bali/images/myriads-2.jpeg',
  'CL': 'https://nananomad.github.io/ceki-bali/images/myriads-3.jpeg',
  'KB': 'https://nananomad.github.io/ceki-bali/images/myriads-4.jpeg',
  'BK': 'https://nananomad.github.io/ceki-bali/images/myriads-5.jpeg',
  'BR': 'https://nananomad.github.io/ceki-bali/images/myriads-6.jpeg',
  'RG': 'https://nananomad.github.io/ceki-bali/images/myriads-7.jpeg',
  'MN': 'https://nananomad.github.io/ceki-bali/images/myriads-8.jpeg',
  'SM': 'https://nananomad.github.io/ceki-bali/images/myriads-9.jpeg',
};

// ================================================================
// GAME STATE
// ================================================================
let G = null;
let autoTimer = null;
let isAutoPlaying = false;
let fullLog = []; // For export

function buildDeck() {
  let deck = [];
  for (let c of CARDS_DEF)
    for (let i = 0; i < 4; i++) deck.push({...c, uid: c.id+'_'+i});
  return deck;
}

function riffleShuffle(deck) {
  let d = [...deck];
  for (let r = 0; r < 8; r++) {
    const mid = Math.floor(d.length/2) + Math.floor(Math.random()*6) - 3;
    const left = d.slice(0, mid), right = d.slice(mid);
    let result = [], i = 0, j = 0;
    while (i < left.length || j < right.length) {
      const prob = (left.length-i) / ((left.length-i)+(right.length-j)+0.001);
      if (j >= right.length || (i < left.length && Math.random() < prob+0.1)) {
        const drop = Math.min(Math.floor(Math.random()*3)+1, left.length-i);
        for (let k=0;k<drop;k++) result.push(left[i++]);
      } else {
        const drop = Math.min(Math.floor(Math.random()*3)+1, right.length-j);
        for (let k=0;k<drop;k++) result.push(right[j++]);
      }
    }
    d = result;
  }
  return d;
}

// ================================================================
// COMBINATION ENGINE
// ================================================================
function findBestCombo(cards) {
  const comboWeight = { soca:100, patuh:50, srigat:20 };

  if (!cards?.length) {
    return {
      combos: [],
      leftover: [],
      score: 0,
      socaCount: 0,
      patuhCount: 0,
      srigatCount: 0,
    };
  }

  const indexed = cards.map((card, index) => ({ ...card, _idx:index }));
  const combos = [];
  const seenMasks = new Set();

  function addCombo(type, selectedCards) {
    const sorted = [...selectedCards].sort((a,b)=>a._idx-b._idx);
    const mask = sorted.reduce((m,c)=>m | (1 << c._idx), 0);
    if (seenMasks.has(mask)) return;
    seenMasks.add(mask);
    combos.push({
      type,
      mask,
      cards: sorted.map(c => ({ ...c })),
    });
  }

  const byId = {};
  const byValue = {};
  for (const card of indexed) {
    if (!byId[card.id]) byId[card.id] = [];
    byId[card.id].push(card);

    const valueKey = `${card.type}:${card.value}`;
    if (!byValue[valueKey]) byValue[valueKey] = [];
    byValue[valueKey].push(card);
  }

  function chooseK(arr, k, start = 0, picked = [], out = []) {
    if (picked.length === k) {
      out.push([...picked]);
      return out;
    }
    for (let i = start; i <= arr.length - (k - picked.length); i++) {
      picked.push(arr[i]);
      chooseK(arr, k, i + 1, picked, out);
      picked.pop();
    }
    return out;
  }

  // Soca: 3 kartu identik
  for (const arr of Object.values(byId)) {
    if (arr.length >= 3) {
      for (const selected of chooseK(arr, 3)) addCombo('soca', selected);
    }
  }

  // Honours Srigat: WR + CK + KN
  const honoursIds = ['WR','CN','KN'];
  const honoursSets = honoursIds.map(id => byId[id] || []);
  if (honoursSets.every(set => set.length > 0)) {
    for (const wr of honoursSets[0]) {
      for (const ck of honoursSets[1]) {
        for (const kn of honoursSets[2]) {
          addCombo('srigat', [wr, ck, kn]);
        }
      }
    }
  }

  // Honours Patuh: dua honours identik + satu honours lain
  const honourCards = indexed.filter(c => c.type === 'honours');
  for (const arr of Object.values(byId)) {
    if (arr[0]?.type !== 'honours' || arr.length < 2) continue;
    const others = honourCards.filter(c => c.id !== arr[0].id);
    if (!others.length) continue;
    for (const pair of chooseK(arr, 2)) {
      for (const other of others) addCombo('patuh', [...pair, other]);
    }
  }

  // Srigat by value: tiga suit berbeda, value sama (non-honours)
  const numericValues = [...new Set(indexed.filter(c => c.type !== 'honours').map(c => c.value))];
  for (const value of numericValues) {
    const suitBuckets = {
      coins: indexed.filter(c => c.type === 'coins' && c.value === value),
      strings: indexed.filter(c => c.type === 'strings' && c.value === value),
      myriads: indexed.filter(c => c.type === 'myriads' && c.value === value),
    };
    if (suitBuckets.coins.length && suitBuckets.strings.length && suitBuckets.myriads.length) {
      for (const c1 of suitBuckets.coins) {
        for (const c2 of suitBuckets.strings) {
          for (const c3 of suitBuckets.myriads) {
            addCombo('srigat', [c1, c2, c3]);
          }
        }
      }
    }
  }

  // Patuh by value: dua kartu identik + satu kartu lain dengan value sama (non-honours)
  for (const arr of Object.values(byId)) {
    if (arr[0]?.type === 'honours' || arr.length < 2) continue;
    const value = arr[0].value;
    const others = indexed.filter(c => c.type !== 'honours' && c.value === value && c.id !== arr[0].id);
    if (!others.length) continue;
    for (const pair of chooseK(arr, 2)) {
      for (const other of others) addCombo('patuh', [...pair, other]);
    }
  }

  function evaluate(mask) {
    let leftoverCount = 0;
    const leftover = [];
    for (let i = 0; i < indexed.length; i++) {
      if ((mask & (1 << i)) === 0) {
        leftoverCount++;
        leftover.push(cards[i]);
      }
    }

    return {
      mask,
      combos: [],
      leftover,
      leftoverCount,
      socaCount: 0,
      patuhCount: 0,
      srigatCount: 0,
      score: -leftoverCount * 10,
    };
  }

  function betterThan(a, b) {
    if (!b) return true;
    if (a.score !== b.score) return a.score > b.score;
    if (a.leftoverCount !== b.leftoverCount) return a.leftoverCount < b.leftoverCount;
    if (a.socaCount !== b.socaCount) return a.socaCount > b.socaCount;
    if (a.patuhCount !== b.patuhCount) return a.patuhCount > b.patuhCount;
    if (a.srigatCount !== b.srigatCount) return a.srigatCount > b.srigatCount;

    const aTypes = a.combos.map(c=>c.type).join('|');
    const bTypes = b.combos.map(c=>c.type).join('|');
    if (aTypes !== bTypes) return aTypes > bTypes;

    const aSig = a.leftover.map(c=>c.uid || c.id).join('|');
    const bSig = b.leftover.map(c=>c.uid || c.id).join('|');
    return aSig < bSig;
  }

  const memo = new Map();
  function dfs(mask) {
    if (memo.has(mask)) return memo.get(mask);

    let best = evaluate(mask);

    for (const combo of combos) {
      if ((mask & combo.mask) !== 0) continue;
      const next = dfs(mask | combo.mask);
      const candidate = {
        ...next,
        combos: [
          { type: combo.type, cards: combo.cards.map(c => ({ ...cards[c._idx] })) },
          ...next.combos,
        ],
        score: next.score + comboWeight[combo.type],
        socaCount: next.socaCount + (combo.type === 'soca' ? 1 : 0),
        patuhCount: next.patuhCount + (combo.type === 'patuh' ? 1 : 0),
        srigatCount: next.srigatCount + (combo.type === 'srigat' ? 1 : 0),
      };

      if (betterThan(candidate, best)) best = candidate;
    }

    memo.set(mask, best);
    return best;
  }

  const best = dfs(0);
  best.combos = [...best.combos].sort((a, b) => comboWeight[b.type] - comboWeight[a.type]);
  return best;
}

function checkPhase(player) {
  const allCards = [...player.hand, ...player.openPile];
  const result = findBestCombo(allCards);
  const { socaCount, leftover } = result;

  if (leftover.length !== 2) return null;
  const [c1, c2] = leftover;

  // MEJAGA: 2+ Soca, leftover 2 cards same id OR same value (non-honours)
  if (socaCount >= 2) {
    const sameId  = c1.id === c2.id;
    const sameVal = c1.type !== 'honours' && c2.type !== 'honours' && c1.value === c2.value;
    if (sameId || sameVal)
      return { phase:'mejaga', lockedCards:leftover, combos:result.combos };
  }

  // MECARI: 1+ Soca, leftover 2 identical cards (same id)
  if (socaCount >= 1 && c1.id === c2.id)
    return { phase:'mecari', lockedCards:leftover, combos:result.combos };

  return null;
}

function resolveWinningSpec(player) {
  if (!player || !player.phase || player.phase === 'none') return null;
  if (!Array.isArray(player.lockedCards) || player.lockedCards.length !== 2) return null;

  const [c1, c2] = player.lockedCards;
  if (!c1 || !c2) return null;

  const sameId = c1.id === c2.id;
  const sameNonHonourValue = c1.type !== 'honours' && c2.type !== 'honours' && c1.value === c2.value;

  if (player.phase === 'mecari') {
    if (!sameId) return null;
    return {
      mode: 'same-id',
      id: c1.id,
      label: c1.name,
      description: `Need identical card: ${c1.name}`
    };
  }

  if (player.phase === 'mejaga') {
    if (sameId) {
      return {
        mode: 'same-id',
        id: c1.id,
        label: c1.name,
        description: `Need identical card: ${c1.name}`
      };
    }

    if (sameNonHonourValue) {
      return {
        mode: 'same-value-non-honours',
        value: c1.value,
        label: `Value ${c1.value}`,
        description: `Need non-honours value ${c1.value}`
      };
    }

    return null;
  }

  return null;
}

function checkWin(card, player) {
  const spec = resolveWinningSpec(player);
  if (!spec || !card) return false;

  if (spec.mode === 'same-id') {
    return card.id === spec.id;
  }

  if (spec.mode === 'same-value-non-honours') {
    return card.type !== 'honours' && card.value === spec.value;
  }

  return false;
}

// ================================================================
// GANTUNG / PUBLIC INFORMATION
// ================================================================
function countPublicIdentical(cardId) {
  if (!G) return 0;
  return G.players.reduce((n, p) => {
    const discardCount = p.discardPile.filter(c => c.id === cardId).length;
    const openCount = p.openPile.filter(c => c.id === cardId).length;
    return n + discardCount + openCount;
  }, 0);
}

function isDeadForSoca(card) {
  return countPublicIdentical(card.id) >= 3;
}

function getCardPotential(card, player) {
  const sameIdPrivate = player.hand.filter(c => c.id === card.id && c.uid !== card.uid).length;
  const sameValueCards = [...player.hand, ...player.openPile].filter(c =>
    c.uid !== card.uid &&
    c.type !== 'honours' &&
    card.type !== 'honours' &&
    c.value === card.value
  ).length;

  return {
    deadForSoca: isDeadForSoca(card),
    usefulForPatuh: sameIdPrivate > 0 || sameValueCards > 0,
    usefulForSrigat: sameValueCards > 0
  };
}

function isCardGantung(card, playerIdx) {
  if (!G) return false;
  return G.players[(playerIdx+1)%5].openPile.some(c=>c.id===card.id);
}

function getGantungIds(playerIdx) {
  if (!G) return new Set();
  return new Set(G.players[(playerIdx+1)%5].openPile.map(c=>c.id));
}

function canDiscard(card, playerIdx, enteringPhase=false) {
  // Exception 1: entering MECARI/MEJAGA — can discard anything
  if (enteringPhase) return true;
  // Exception 2: Player already in MECARI/MEJAGA — no GANTUNG restriction
  if (G && G.players[playerIdx] && G.players[playerIdx].phase !== 'none') return true;
  // Exception 3: Kartu Mati — can discard even if gantung
  if (isDeadForSoca(card)) return true;
  // Normal rule: cannot discard if gantung
  return !isCardGantung(card, playerIdx);
}

// ================================================================
// AI
// ================================================================
// ── SRIGAT-TRIGGERS-PHASE DETECTOR ──
// Cek apakah kartu X jika ditambahkan ke hand bisa:
// 1. Melengkapi Srigat (dengan 2 kartu loose/patuh ekor)
// 2. Yang membebaskan pasangan identik dari Patuh Dua
// 3. Sehingga pasangan identik itu jadi Locked → MECARI/MEJAGA
//
// Ini strategi tingkat tinggi: reorganisasi Patuh→Srigat untuk buka MECARI
function wouldSrigatTriggerPhase(player, candidateCard) {
  if (!candidateCard || candidateCard.type === 'honours') return false;

  const allCards = [...player.hand, ...player.openPile, candidateCard];
  if (allCards.length !== 12) return false; // belum discard

  // Simulasikan setiap kemungkinan discard dari hand
  // Cek apakah setelah discard, terbentuk MECARI/MEJAGA
  for (const discardCandidate of player.hand) {
    if (!canDiscard(discardCandidate, player.id, false)) continue;
    const simCards = allCards.filter(c => c.uid !== discardCandidate.uid);
    if (simCards.length === 11 && wouldEnterPhase(simCards)) {
      // Verifikasi bahwa candidateCard berkontribusi pada Srigat
      const resultWith = findBestCombo(simCards);
      const resultWithout = findBestCombo(simCards.filter(c => c.uid !== candidateCard.uid));
      // Jika srigatCount bertambah setelah kandidat masuk → dia yang trigger
      if ((resultWith.srigatCount || 0) > (resultWithout.srigatCount || 0)) {
        return true;
      }
    }
  }
  return false;
}

function wouldEnterPhase(cards) {
  if (cards.length !== 11) return false;
  const result = findBestCombo(cards);
  if (result.leftover.length !== 2) return false;
  const [c1,c2] = result.leftover;
  if (result.socaCount >= 2) {
    if (c1.id===c2.id) return true;
    if (c1.type!=='honours' && c2.type!=='honours' && c1.value===c2.value) return true;
  }
  if (result.socaCount >= 1 && c1.id===c2.id) return true;
  return false;
}

function getComboUidsFromResult(result) {
  const uids = new Set();
  result.combos.forEach(combo => combo.cards.forEach(c => uids.add(c.uid)));
  return uids;
}

function getProtectedHandUids(player, handCards) {
  const protectedUids = new Set();
  const openById = {};
  player.openPile.forEach(c => {
    if (!openById[c.id]) openById[c.id] = [];
    openById[c.id].push(c);
  });

  handCards.forEach(card => {
    const sameInHand = handCards.filter(c => c.id === card.id).length;
    const sameInOpen = (openById[card.id] || []).length;

    // Protect if this hand card is strongly tied to an open-pile Soca route
    if ((sameInOpen >= 1 && sameInHand >= 2) || (sameInOpen >= 2 && sameInHand >= 1)) {
      protectedUids.add(card.uid);
    }
  });

  return protectedUids;
}

function evaluateCombinedShape(cards) {
  const result = findBestCombo(cards);
  let score = result.score;
  score += result.socaCount * 32;
  score += (result.patuhCount || 0) * 16;
  score += (result.srigatCount || 0) * 10;
  score -= result.leftover.length * 14;

  if (cards.length === 11 && wouldEnterPhase(cards)) score += 420;

  return { result, score };
}

function countSameId(cards, card) {
  return cards.filter(c => c.id === card.id && c.uid !== card.uid).length;
}

function countSameValueNonHonours(cards, card) {
  if (card.type === 'honours') return 0;
  return cards.filter(c =>
    c.uid !== card.uid &&
    c.type !== 'honours' &&
    c.value === card.value
  ).length;
}

// ── W19 FIX: Soca Opportunity dari Open Pile ──
// Cek apakah setelah membuang kartu X, openPile card bisa membentuk Soca
// dengan 2 kartu identik yang tersisa di hand
// Ini memungkinkan AI "memecah" Patuh/Srigat demi peluang Soca yang lebih baik
function scoreSocaOpportunityFromOpen(simulatedHandCards, openPile) {
  let bonus = 0;
  for (const openCard of openPile) {
    const sameInSimHand = simulatedHandCards.filter(c => c.id === openCard.id).length;
    if (sameInSimHand >= 2) {
      // Setelah discard, openCard bisa form Soca dengan 2 di hand
      bonus += 350; // bonus besar — Soca adalah target utama
    } else if (sameInSimHand === 1) {
      // Satu langkah lagi dari Soca — ada 1 di hand + 1 di open
      bonus += 60;
    }
  }
  return bonus;
}

function evaluateDiscardCandidate(card, player, handCards, openPile, enteringPhase=false) {
  const pidx = player.id;
  if (!canDiscard(card, pidx, enteringPhase)) {
    return { total: -Infinity, candidate: card, simulatedCards: [], shape: null };
  }

  const combinedBefore = [...handCards, ...openPile];
  const protectedUids = getProtectedHandUids(player, handCards);
  const simulatedCards = [...combinedBefore].filter(c => c.uid !== card.uid);
  const simulatedHandOnly = handCards.filter(c => c.uid !== card.uid);
  const shape = evaluateCombinedShape(simulatedCards);
  let total = shape.score;

  const comboUids = getComboUidsFromResult(shape.result);
  const sameIdPrivate = countSameId(handCards, card);
  const sameValuePartners = countSameValueNonHonours(simulatedCards, card);

  // Strong bonus if discarding this card enters phase
  if (simulatedCards.length === 11 && wouldEnterPhase(simulatedCards)) total += 700;

  // W19 FIX: bonus jika discard membuka peluang Soca dari openPile
  const socaOpenBonus = scoreSocaOpportunityFromOpen(simulatedHandOnly, openPile);
  total += socaOpenBonus;

  // SRIGAT→PHASE FIX: bonus besar jika discard ini memungkinkan Srigat trigger MECARI
  // Mendorong AI rela pecah Patuh Dua demi masuk fase
  if (simulatedCards.length === 11) {
    const simResult = findBestCombo(simulatedCards);
    const simWithoutCandidate = simulatedCards.filter(c => c.uid !== card.uid);
    const simResultWithout = simWithoutCandidate.length > 0 ? findBestCombo(simWithoutCandidate) : null;
    const srigatAdded = simResultWithout
      ? (simResult.srigatCount || 0) > (simResultWithout.srigatCount || 0)
      : false;
    if (srigatAdded && wouldEnterPhase(simulatedCards)) {
      total += 600; // Srigat yang trigger fase = sangat berharga
    }
  }

  // Keep cards that are strategically anchored
  if (protectedUids.has(card.uid)) total -= 180;
  if (comboUids.has(card.uid)) total -= 120;

  // Dead for Soca is only a mild discard preference
  if (isDeadForSoca(card)) total += 22;

  // Preserve same-id and same-value structure where possible
  if (sameIdPrivate > 0) total -= 75;
  if (sameIdPrivate >= 2) total -= 35;
  if (sameValuePartners > 0) total -= 46;
  if (sameValuePartners >= 2) total -= 18;

  // Honour singles are usually easier to release
  if (card.type === 'honours') {
    total += sameIdPrivate === 0 ? 26 : 6;
  }

  // Slight preference to release isolated leftovers
  const inCurrentBestCombo = getComboUidsFromResult(findBestCombo(combinedBefore)).has(card.uid);
  if (!inCurrentBestCombo) total += 18;

  return { total, candidate: card, simulatedCards, shape };
}

function pickBestDiscardEvaluation(player, handCards, openPile, enteringPhase=false) {
  const evaluations = handCards.map(card =>
    evaluateDiscardCandidate(card, player, handCards, openPile, enteringPhase)
  ).filter(e => Number.isFinite(e.total));

  if (!evaluations.length) return null;

  evaluations.sort((a, b) => {
    if (a.total !== b.total) return b.total - a.total;

    // Tie-break: prefer discarding weaker support cards
    const aSameId = countSameId(handCards, a.candidate);
    const bSameId = countSameId(handCards, b.candidate);
    if (aSameId !== bSameId) return aSameId - bSameId;

    const aSameVal = countSameValueNonHonours([...handCards, ...openPile], a.candidate);
    const bSameVal = countSameValueNonHonours([...handCards, ...openPile], b.candidate);
    if (aSameVal !== bSameVal) return aSameVal - bSameVal;

    return a.candidate.name.localeCompare(b.candidate.name);
  });

  return evaluations[0];
}

function aiDecide(player, topDiscard) {
  if (!topDiscard) return { takeDiscard:false, reason:'no-discard' };
  if (player.phase !== 'none') return { takeDiscard:false, reason:'already-in-phase' };

  const baseCards = [...player.hand, ...player.openPile];

  // ── SOCA FORMATION CHECKS (highest priority) ──

  // Skenario 1: sudah punya Soca dari hand+openPile → ABAIKAN topDiscard yang sama
  // Hand x2 + OpenPile x1 = Soca sudah terbentuk → topDiscard tidak berguna
  const alreadyHasSocaWithOpen = player.openPile.some(openCard =>
    openCard.id === topDiscard.id &&
    player.hand.filter(c => c.id === openCard.id).length >= 2
  );
  if (alreadyHasSocaWithOpen) {
    return { takeDiscard:false, reason:'soca-already-complete' };
  }

  // Skenario 2: Hand x2 + topDiscard = Soca Formation via openPile
  // Ambil topDiscard → masuk openPile → STEP 2b trigger Soca Formation
  const handCount = player.hand.filter(c => c.id === topDiscard.id).length;
  if (handCount >= 2) {
    return { takeDiscard:true, reason:'soca-formation-trigger' };
  }

  // Skenario 3: Hand x1 + OpenPile x1 + topDiscard = Soca Formation
  // Tiga sumber identik terkumpul → Soca!
  const openCount = player.openPile.filter(c => c.id === topDiscard.id).length;
  if (handCount >= 1 && openCount >= 1) {
    return { takeDiscard:true, reason:'soca-formation-three-source' };
  }

  // ── SRIGAT → MECARI/MEJAGA TRIGGER ──
  // Skenario: draw topDiscard bisa lengkapi Srigat → bebas pasangan identik → MECARI
  // Ini strategi tingkat tinggi: reorganisasi Patuh Dua menjadi Srigat + Locked
  if (wouldSrigatTriggerPhase(player, topDiscard)) {
    return { takeDiscard:true, reason:'srigat-triggers-phase' };
  }

  // ── STANDARD EVALUATION ──
  const baseline = evaluateCombinedShape(baseCards);

  const takeEval = pickBestDiscardEvaluation(
    player,
    [...player.hand],
    [...player.openPile, topDiscard],
    false
  );

  if (!takeEval) return { takeDiscard:false, reason:'no-legal-followup' };

  const sameIdSupport = countSameId(baseCards, topDiscard);
  const sameValueSupport = countSameValueNonHonours(baseCards, topDiscard);
  const wouldPhase = takeEval.simulatedCards.length === 11 && wouldEnterPhase(takeEval.simulatedCards);

  let takeScore = takeEval.total;
  if (sameIdSupport >= 2) takeScore += 160;
  else if (sameIdSupport >= 1) takeScore += 70;

  if (sameValueSupport >= 2) takeScore += 55;
  else if (sameValueSupport >= 1) takeScore += 24;

  if (topDiscard.type === 'honours' && baseCards.filter(c => c.type === 'honours').length >= 2) {
    takeScore += 28;
  }

  if (wouldPhase) takeScore += 220;

  const delta = takeScore - baseline.score;

  if (wouldPhase) return { takeDiscard:true, reason:'phase-entry', score:takeScore, delta };
  if (sameIdSupport >= 2 && delta >= 15) return { takeDiscard:true, reason:'same-id-pressure', score:takeScore, delta };
  if (delta >= 55) return { takeDiscard:true, reason:'shape-upgrade', score:takeScore, delta };

  return { takeDiscard:false, reason:'draw-preferred', score:takeScore, delta };
}

function aiChooseDiscard(player, enteringPhase=false, excludeUid=null) {
  const handCards = player.hand.filter(c => c.uid !== excludeUid);
  if (!handCards.length) return null;

  const evaluation = pickBestDiscardEvaluation(player, handCards, player.openPile, enteringPhase);
  if (evaluation) return evaluation.candidate;

  // Fallback: first legal discard, else first card
  return handCards.find(c => canDiscard(c, player.id, enteringPhase)) || handCards[0];
}

// ================================================================
// GAME LOGIC
// ================================================================
// [simulator newGame removed — see newGame() in game layer]

// [stepGame removed — using processAITurn in game layer]

// [processOneTurn removed — using processAITurn in game layer]

// [checkDrawForPhase defined in game layer]

function formatComboLabel(type) {
  if (type === 'soca') return 'SOCA';
  if (type === 'patuh') return 'PATUH';
  if (type === 'srigat') return 'SRIGAT';
  return type.toUpperCase();
}

function describeCombo(combo) {
  if (!combo || !combo.cards || !combo.cards.length) return '';
  if (combo.type === 'soca') return `${formatComboLabel(combo.type)}: ${combo.cards[0].name} 3x`;
  return `${formatComboLabel(combo.type)}: ${combo.cards.map(c => c.name).join(', ')}`;
}

function buildWinnerReveal(player, winningCard) {
  const finalCards = [...player.hand, ...player.openPile, ...(player.lockedCards || []), winningCard];
  const analysis = findBestCombo(finalCards);
  const lockedHtml = (player.lockedCards || []).map(c => renderCard(c, undefined, false)).join('');
  const winningHtml = renderCard(winningCard, undefined, false);
  const revealHtml = `${lockedHtml}<span class="winner-card-sep">+</span>${winningHtml}`;
  const comboSummary = (analysis.combos || []).map(describeCombo).filter(Boolean).join(', ');
  return { finalCards, analysis, revealHtml, comboSummary };
}

// [declareWinner defined in game layer below]

// [advanceTurn defined in game layer]


// ================================================================
// GAME CONSTANTS & STATE
// ================================================================
const HUMAN_IDX = 1; // Player 2 = index 1

let humanState = 'idle'; // idle | step_draw | step_discard | timeout
let dragData = null;
let logVisible = false;
let aiTimer = null;

// ── TIMER MANAGER ──
const Timer = {
  duration: 30,
  remaining: 30,
  interval: null,

  start() {
    this.remaining = this.duration;
    this.update();
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.remaining--;
      this.update();
      if (this.remaining <= 0) {
        this.stop();
        this.onTimeout();
      }
    }, 1000);
    document.getElementById('timerWrap').classList.remove('hidden');
  },

  stop() {
    clearInterval(this.interval);
    this.interval = null;
    document.getElementById('timerWrap').classList.add('hidden');
  },

  update() {
    const pct = (this.remaining / this.duration) * 100;
    const bar = document.getElementById('timerBar');
    const txt = document.getElementById('timerText');
    const icon = document.getElementById('timerIcon');
    bar.style.width = pct + '%';
    txt.textContent = `Giliran Kamu — ${this.remaining} detik`;
    bar.classList.remove('warn', 'urgent');
    if (this.remaining <= 5) {
      bar.classList.add('urgent');
      icon.textContent = '⚠️';
    } else if (this.remaining <= 10) {
      bar.classList.add('warn');
      icon.textContent = '⏰';
      if (this.remaining === 10) addLog('⚠ 10 detik tersisa!', 'warn');
    } else {
      icon.textContent = '⏱';
    }
  },

  onTimeout() {
    addLog('⏱ Waktu habis — Auto play!', 'warn');
    setHumanState('timeout');
    autoPlayHuman();
  }
};

function setHumanState(state) {
  humanState = state;
  const deck = document.getElementById('drawDeck');
  const p1disc = document.getElementById('p1DiscardTop');
  const hint = document.getElementById('actionHint');

  deck.classList.remove('highlight', 'disabled');
  p1disc.classList.remove('highlight-take');
  hint.classList.add('hidden');

  switch(state) {
    case 'step_draw':
      // Highlight draw options
      deck.classList.add('highlight');
      const top = getP1DiscardTop();
      if (top) {
        p1disc.classList.add('highlight-take');
        p1disc.setAttribute('draggable', 'true');
        hint.textContent = '🎴 Drag kartu P1 ke Open Pile — atau Klik Draw Deck';
      } else {
        p1disc.setAttribute('draggable', 'false');
        hint.textContent = '🎴 Klik Draw Deck untuk ambil kartu';
      }
      hint.classList.remove('hidden');
      Timer.start();
      break;

    case 'step_discard':
      deck.classList.add('disabled');
      p1disc.setAttribute('draggable', 'false');
      hint.textContent = '🗑 Drag kartu dari Hand ke area Discard';
      hint.classList.remove('hidden');
      break;

    case 'idle':
    case 'timeout':
      p1disc.setAttribute('draggable', 'false');
      Timer.stop();
      break;
  }
}

// ================================================================
// HELPERS
// ================================================================
function getP1DiscardTop() {
  if (!G) return null;
  const p1 = G.players[0]; // Player 1 (AI sebelum P2)
  if (!p1 || !p1.discardPile || p1.discardPile.length === 0) return null;
  return p1.discardPile[p1.discardPile.length - 1];
}

function getHumanPlayer() {
  return G ? G.players[HUMAN_IDX] : null;
}

// ================================================================
// DRAG & DROP — AMBIL DARI DISCARD P1
// ================================================================
function handleDragDiscardP1(event) {
  if (humanState !== 'step_draw') { event.preventDefault(); return; }
  const card = getP1DiscardTop();
  if (!card) { event.preventDefault(); return; }

  dragData = { type: 'from_p1_discard', card };
  event.dataTransfer.effectAllowed = 'move';

  // Ghost image
  const ghost = createGhost(card);
  event.dataTransfer.setDragImage(ghost, 19, 41);

  // Visual feedback
  event.currentTarget.classList.add('dragging');
  addLog(`Mengambil ${card.name} dari Discard P1...`, 'human');
}

// ================================================================
// DRAG & DROP — KARTU DI HAND P2
// ================================================================
function handleDragStartHand(event, uid) {
  if (humanState !== 'step_discard' && humanState !== 'step_draw') {
    // Allow sort anytime during human turn
    if (humanState === 'idle') { event.preventDefault(); return; }
  }

  const p2 = getHumanPlayer();
  const card = p2.hand.find(c => c.uid === uid);
  if (!card) { event.preventDefault(); return; }

  dragData = { type: 'from_hand', card, uid };
  event.dataTransfer.effectAllowed = 'move';

  const ghost = createGhost(card);
  event.dataTransfer.setDragImage(ghost, 19, 41);
  event.currentTarget.classList.add('dragging');
}

// ── DROP ke Open Pile P2 (dari Discard P1) ──
function handleDropOpenPile(event) {
  event.preventDefault();
  event.currentTarget.classList.remove('drop-active');

  if (!dragData || dragData.type !== 'from_p1_discard') return;
  if (humanState !== 'step_draw') return;

  const card = dragData.card;
  dragData = null;

  // Execute: pindah dari discard P1 ke open pile P2
  const p1 = G.players[0];
  const p2 = getHumanPlayer();

  p1.discardPile.pop();
  p2.openPile.push(card);

  addLog(`✅ ${card.name} diambil ke Open Pile`, 'human');
  Timer.stop();
  setHumanState('step_discard');
  renderGame();
}

// ── DROP ke Discard Zone P2 (buang kartu) ──
function handleDropDiscard(event) {
  event.preventDefault();
  const zone = event.currentTarget;
  zone.classList.remove('drop-active');

  if (!dragData || dragData.type !== 'from_hand') return;
  if (humanState !== 'step_discard') return;

  const card = dragData.card;
  const uid = dragData.uid;
  dragData = null;

  const p2 = getHumanPlayer();

  // Validate: GANTUNG check
  if (!canDiscard(card, HUMAN_IDX)) {
    // Reject
    zone.classList.add('reject');
    setTimeout(() => zone.classList.remove('reject'), 500);
    addLog(`⚠ Tidak bisa buang ${card.name} — GANTUNG!`, 'warn');
    return;
  }

  // Execute discard
  const idx = p2.hand.findIndex(c => c.uid === uid);
  if (idx >= 0) p2.hand.splice(idx, 1);
  p2.discardPile.push(card);

  addLog(`🗑 ${card.name} dibuang ke Discard`, 'human');
  Timer.stop();
  setHumanState('idle');

  // Re-analyze & check phase
  const allCards = [...p2.hand, ...p2.openPile];
  const result = findBestCombo(allCards);
  p2.combos = result.combos;

  // Check phase entry
  if (p2.phase === 'none') {
    const phaseCheck = checkPhase(p2);
    if (phaseCheck) {
      p2.phase = phaseCheck.phase;
      p2.lockedCards = phaseCheck.lockedCards;
      p2.combos = phaseCheck.combos;
      for (let lc of p2.lockedCards) {
        const hi = p2.hand.findIndex(c => c.uid === lc.uid);
        if (hi >= 0) p2.hand.splice(hi, 1);
        const oi = p2.openPile.findIndex(c => c.uid === lc.uid);
        if (oi >= 0) p2.openPile.splice(oi, 1);
      }
      const label = p2.phase === 'mecari' ? '🔍 MECARI' : '🛡 MEJAGA';
      addLog(`${label} — ${p2.name} masuk fase!`, p2.phase === 'mecari' ? 'mecari' : 'mejaga');
    }
  }

  renderGame();
  advanceTurn();
  scheduleAI();
}

// ── DROP di Hand P2 (sort manual) ──
function handleDropHand(event) {
  event.preventDefault();
  if (!dragData || dragData.type !== 'from_hand') return;

  // Find drop position
  const hand = document.getElementById('p2Hand');
  const cards = [...hand.querySelectorAll('.card[data-uid]')];
  const dropX = event.clientX;

  let targetIdx = cards.length;
  for (let i = 0; i < cards.length; i++) {
    const rect = cards[i].getBoundingClientRect();
    if (dropX < rect.left + rect.width / 2) {
      targetIdx = i;
      break;
    }
  }

  const p2 = getHumanPlayer();
  const uid = dragData.uid;
  const fromIdx = p2.hand.findIndex(c => c.uid === uid);
  dragData = null;

  if (fromIdx === -1 || fromIdx === targetIdx) return;

  // Reorder
  const [moved] = p2.hand.splice(fromIdx, 1);
  const insertAt = targetIdx > fromIdx ? targetIdx - 1 : targetIdx;
  p2.hand.splice(insertAt, 0, moved);

  renderGame();
}

// ── DRAG OVER handlers ──
function handleDragOver(event) {
  event.preventDefault();
  event.currentTarget.classList.add('drop-active');
  event.dataTransfer.dropEffect = 'move';
}

function handleDragLeave(event) {
  event.currentTarget.classList.remove('drop-active');
}

function handleDragOverHand(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
}

// ── Create drag ghost ──
function createGhost(card) {
  const ghost = document.createElement('div');
  ghost.className = 'drag-ghost';
  const imgUrl = CARD_IMAGES[card.id];
  if (imgUrl) {
    ghost.style.backgroundImage = `url(${imgUrl})`;
    ghost.style.backgroundSize = 'cover';
    ghost.style.backgroundPosition = 'center';
  }
  ghost.style.position = 'fixed';
  ghost.style.left = '-200px';
  document.body.appendChild(ghost);
  setTimeout(() => ghost.remove(), 100);
  return ghost;
}

// ================================================================
// DRAW DECK — Click Handler
// ================================================================
function humanClickDraw() {
  if (humanState !== 'step_draw') return;
  if (!G || G.drawPile.length === 0) {
    addLog('⚠ Draw Pile kosong!', 'warn');
    return;
  }

  const p2 = getHumanPlayer();
  const card = G.drawPile.pop();

  // Spawn di Hand paling kanan (Loose)
  p2.hand.push(card);

  addLog(`📥 Kamu mengambil kartu dari Draw Deck`, 'human');
  Timer.stop();
  setHumanState('step_discard');

  // Re-analyze
  const result = findBestCombo([...p2.hand, ...p2.openPile]);
  p2.combos = result.combos;

  renderGame();
}

// ================================================================
// AUTO SORT HAND
// ================================================================
function autoSortHand() {
  const p2 = getHumanPlayer();
  if (!p2) return;

  const allCards = [...p2.hand, ...p2.openPile];
  const result = findBestCombo(allCards);

  // Collect sorted hand cards
  const inCombos = new Set();
  const socaCards = [], patuhCards = [], srigatCards = [], looseCards = [];

  for (const combo of result.combos) {
    for (const c of combo.cards) {
      if (p2.hand.some(h => h.uid === c.uid)) {
        inCombos.add(c.uid);
        if (combo.type === 'soca') socaCards.push(c);
        else if (combo.type === 'patuh') patuhCards.push(c);
        else srigatCards.push(c);
      }
    }
  }

  for (const c of p2.hand) {
    if (!inCombos.has(c.uid)) looseCards.push(c);
  }

  p2.hand = [...socaCards, ...patuhCards, ...srigatCards, ...looseCards];
  renderGame();
  addLog('↕ Hand di-sort otomatis', 'human');
}

// ================================================================
// AUTO PLAY (timeout / AI takeover for P2)
// ================================================================
function autoPlayHuman() {
  const p2 = getHumanPlayer();
  if (!p2) return;

  addLog('🤖 Auto play aktif untuk P2', 'warn');

  // Step 1: Draw
  if (humanState === 'timeout' || humanState === 'step_draw') {
    // AI decide
    const prevIdx = (HUMAN_IDX + G.players.length - 1) % G.players.length;
    const prevDiscard = G.players[prevIdx].discardPile;
    const topDiscard = prevDiscard.length > 0 ? prevDiscard[prevDiscard.length - 1] : null;
    const decision = aiDecide(p2, topDiscard, G);

    if (decision.takeDiscard && topDiscard) {
      prevDiscard.pop();
      p2.openPile.push(topDiscard);
      addLog(`🤖 Auto: ambil ${topDiscard.name} dari Discard`, 'warn');
    } else {
      if (G.drawPile.length === 0) {
        G.phase = 'ended';
        addLog('Draw Pile habis — SERI!', 'round');
        renderGame();
        return;
      }
      const card = G.drawPile.pop();
      p2.hand.push(card);
      addLog(`🤖 Auto: draw dari Deck`, 'warn');

      // Check draw for phase players
      checkDrawForPhase(card, HUMAN_IDX);
      if (G.phase === 'ended') { renderGame(); return; }
    }
  }

  // Step 2: Re-analyze
  const allCards = [...p2.hand, ...p2.openPile];
  const result = findBestCombo(allCards);
  p2.combos = result.combos;

  // Step 3: Discard
  const toDiscard = aiChooseDiscard(p2, false, null);
  if (toDiscard && canDiscard(toDiscard, p2.id, false)) {
    const hi = p2.hand.findIndex(c => c.uid === toDiscard.uid);
    if (hi >= 0) p2.hand.splice(hi, 1);
    p2.discardPile.push(toDiscard);
    addLog(`🤖 Auto: buang ${toDiscard.name}`, 'warn');
  } else if (toDiscard) {
    // Fallback: cari kartu yang bisa dibuang
    const alt = p2.hand.find(c => canDiscard(c, p2.id, false));
    if (alt) {
      p2.hand.splice(p2.hand.findIndex(c => c.uid === alt.uid), 1);
      p2.discardPile.push(alt);
      addLog(`🤖 Auto: buang ${alt.name} (fallback)`, 'warn');
    }
  }

  // Step 4: Check phase
  if (p2.phase === 'none') {
    const phaseCheck = checkPhase(p2);
    if (phaseCheck) {
      p2.phase = phaseCheck.phase;
      p2.lockedCards = phaseCheck.lockedCards;
      p2.combos = phaseCheck.combos;
      for (let lc of p2.lockedCards) {
        const hi = p2.hand.findIndex(c => c.uid === lc.uid);
        if (hi >= 0) p2.hand.splice(hi, 1);
        const oi = p2.openPile.findIndex(c => c.uid === lc.uid);
        if (oi >= 0) p2.openPile.splice(oi, 1);
      }
      addLog(`🤖 Auto: ${p2.phase.toUpperCase()} terdeteksi`, p2.phase);
    }
  }

  setHumanState('idle');
  renderGame();
  advanceTurn();
  scheduleAI();
}

// ================================================================
// AI TURN SCHEDULER
// ================================================================

function scheduleAI() {
  if (!G || G.phase === 'ended') return;

  if (G.activePlayer === HUMAN_IDX) {
    // Human turn
    setStatus('🎴 Giliran kamu!');
    setHumanState('step_draw');
    return;
  }

  // AI turn — delay for readability
  clearTimeout(aiTimer);
  aiTimer = setTimeout(() => {
    if (!G || G.phase === 'ended') return;
    processAITurn();
    renderGame();
    if (G.phase !== 'ended') scheduleAI();
  }, 700);
}

// ================================================================
// AI TURN (based on simulator processOneTurn)
// ================================================================
function processAITurn() {
  const p = G.players[G.activePlayer];
  const prevIdx = (G.activePlayer + 4) % 5;
  const prevDiscard = G.players[prevIdx].discardPile;
  const topDiscard = prevDiscard.length ? prevDiscard[prevDiscard.length-1] : null;

  addLog(`— ${p.name} (R${G.round}/T${G.turn}) —`, 'action');

  let drawnCard = null, fromDiscard = false;

  // ── STEP 1: DRAW ──
  const dec = aiDecide(p, topDiscard);
  if (dec.takeDiscard && topDiscard) {
    drawnCard = prevDiscard.pop();
    p.openPile.push(drawnCard);
    fromDiscard = true;
    addLog(`${p.name} ambil ${drawnCard.name}`, 'action');
  } else {
    if (!G.drawPile.length) {
      addLog('⚠ Draw pile habis — SERI!', 'round');
      G.phase = 'ended'; return;
    }
    drawnCard = G.drawPile.pop();
    p.hand.push(drawnCard);
    addLog(`${p.name} draw ${drawnCard.name}`, 'normal');

    if (p.phase !== 'none' && checkWin(drawnCard, p)) {
      declareWinner(G.activePlayer, drawnCard); return;
    }
    checkDrawForPhase(drawnCard, G.activePlayer);
    if (G.phase === 'ended') return;
  }

  // ── STEP 2: DISCARD (hand kembali ke 11) ──
  const doAIDiscard = (excludeUid) => {
    const toDiscard = aiChooseDiscard(p, false, excludeUid);
    if (!toDiscard) return;
    if (!canDiscard(toDiscard, p.id, false)) {
      // GANTUNG — cari alternatif
      const alt = p.hand.find(c =>
        c.uid !== toDiscard.uid &&
        (excludeUid ? c.uid !== excludeUid : true) &&
        canDiscard(c, p.id, false)
      );
      const target = alt || p.hand.find(c => excludeUid ? c.uid !== excludeUid : true);
      if (target) {
        p.hand.splice(p.hand.findIndex(c => c.uid === target.uid), 1);
        p.discardPile.push(target);
        addLog(`${p.name} buang ${target.name}`, 'normal');
      }
    } else {
      const hi = p.hand.findIndex(c => c.uid === toDiscard.uid);
      if (hi >= 0) p.hand.splice(hi, 1);
      p.discardPile.push(toDiscard);
      addLog(`${p.name} buang ${toDiscard.name}`, 'normal');
    }
  };

  if (!fromDiscard) {
    doAIDiscard(null);
  } else {
    doAIDiscard(drawnCard.uid);
  }

  // ── STEP 3: CHECK PHASE ──
  const allCards = [...p.hand, ...p.openPile];
  const result = findBestCombo(allCards);
  p.combos = result.combos;

  if (p.phase === 'none') {
    const phaseCheck = checkPhase(p);
    if (phaseCheck) {
      p.phase = phaseCheck.phase;
      p.lockedCards = phaseCheck.lockedCards;
      p.combos = phaseCheck.combos;
      for (let lc of p.lockedCards) {
        const hi = p.hand.findIndex(c => c.uid === lc.uid);
        if (hi >= 0) p.hand.splice(hi, 1);
        const oi = p.openPile.findIndex(c => c.uid === lc.uid);
        if (oi >= 0) p.openPile.splice(oi, 1);
      }
      addLog(`${p.name} masuk ${p.phase.toUpperCase()}!`,
        p.phase === 'mecari' ? 'mecari' : 'mejaga');
    }
  }

  advanceTurn();
}

// ================================================================
// RENDER
// ================================================================
function renderGame() {
  if (!G) return;

  // Update header
  document.getElementById('statRound').textContent = `Ronde ${G.round}`;
  document.getElementById('statDraw').textContent = `Draw: ${G.drawPile.length}`;
  document.getElementById('deckCount').textContent = G.drawPile.length;

  // Deck highlight
  const deck = document.getElementById('drawDeck');
  deck.classList.toggle('highlight', humanState === 'step_draw');
  deck.classList.toggle('disabled', humanState !== 'step_draw');

  // Render AI players
  renderAIPlayers();

  // Render P1 Discard top (center)
  renderP1DiscardCenter();

  // Render P2
  renderHumanPlayer();

  // Phase / Gantung info bar
  renderInfoBar();
}

function renderAIPlayers() {
  const aiSlots = [
    { elemId:'player-0', playerIdx:0 },  // P1
    { elemId:'player-2', playerIdx:2 },  // P3
    { elemId:'player-3', playerIdx:3 },  // P4
    { elemId:'player-4', playerIdx:4 },  // P5
  ];

  for (const {elemId, playerIdx} of aiSlots) {
    const el = document.getElementById(elemId);
    const p = G.players[playerIdx];
    const isActive = playerIdx === G.activePlayer && G.phase === 'playing';

    el.className = 'ai-slot';
    if (isActive) el.classList.add('active');
    if (p.phase === 'mecari') el.classList.add('mecari');
    if (p.phase === 'mejaga') el.classList.add('mejaga');

    const handCount = p.hand.length + p.openPile.length;
    const phaseBadge = p.phase !== 'none'
      ? `<span class="ai-phase-tag ${p.phase}">${p.phase.toUpperCase()}</span>`
      : '';

    // Closed hand cards
    const closedCards = Array(Math.min(p.hand.length, 8)).fill(0)
      .map(() => `<div class="card-back-mini"></div>`).join('');

    // Open pile — ALL cards in row
    let openPileHTML = '';
    if (p.openPile.length > 0) {
      openPileHTML = `<div class="ai-open-row">` +
        p.openPile.map(c => `<div class="ai-open-card" title="${c.name}">${
          CARD_IMAGES[c.id]
            ? `<img src="${CARD_IMAGES[c.id]}" style="width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 0.3s" onload="this.style.opacity=1" onerror="this.style.display='none'">`
            : `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:0.35rem;font-weight:700;">${c.value===0?'★':c.value}</div>`
        }</div>`).join('') +
        `</div>`;
    } else {
      openPileHTML = `<div class="ai-open-pile empty"></div>`;
    }

    // Discard — fan/cascade (show all, overlapping)
    let discardTop = '';
    if (p.discardPile.length > 0) {
      const overlap = 12;
      const totalW = Math.max(41, 8 + p.discardPile.length * overlap);
      const fanCards = p.discardPile.map((c, i) => {
        // Same natural scatter formula as P2
        const rotSeed = (i * 13 + i * i * 7) % 30;
        const rot = (rotSeed - 15);
        const left = 4 + i * overlap;
        const top = 2 + (Math.abs((i * 11) % 8) - 4);
        const imgUrl = CARD_IMAGES[c.id];
        const inner = imgUrl
          ? `<img src="${imgUrl}" alt="${c.name}" style="width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 0.3s" onload="this.style.opacity=1" onerror="this.style.display='none'">`
          : `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:0.4rem;font-weight:700;color:#333;">${c.value===0?'★':c.value}</div>`;
        return `<div class="ai-discard-fan-card" style="left:${left}px;top:${top}px;transform:rotate(${rot}deg);z-index:${i}" title="${c.name}">${inner}</div>`;
      }).join('');
      discardTop = `<div class="ai-discard-fan" style="width:${totalW}px">${fanCards}</div>`;
    } else {
      discardTop = `<div class="ai-discard-top empty"></div>`;
    }

    // GANTUNG indicator
    const gantungHTML = isGantungActive(playerIdx)
      ? `<span style="font-size:0.3rem;color:var(--gantung);font-family:'Cinzel',serif;">GANTUNG</span>`
      : '';

    el.innerHTML = `
      <div class="ai-avatar">${getPlayerEmoji(playerIdx)}</div>
      ${phaseBadge}
      <span class="ai-name">Player ${playerIdx+1}</span>
      <div class="ai-hand-closed">${closedCards}</div>
      <div class="ai-piles">
        <div>
          <div class="ai-pile-label">Discard</div>
          ${discardTop}
        </div>
        <div>
          <div class="ai-pile-label">Open</div>
          ${openPileHTML}
        </div>
      </div>
      <div class="ai-info-row">
        <span>✋${handCount}</span>
        <span>🗑${p.discardPile.length}</span>
        ${gantungHTML}
      </div>
    `;
  }
}

function renderP1DiscardCenter() {
  const p1 = G.players[0];
  const el = document.getElementById('p1DiscardTop');
  const top = p1.discardPile.length > 0
    ? p1.discardPile[p1.discardPile.length-1] : null;

  el.innerHTML = '';
  el.classList.remove('empty', 'highlight-take');

  if (!top) {
    el.classList.add('empty');
    el.innerHTML = `<span class="pile-empty" style="font-size:0.5rem;color:rgba(255,255,255,0.15);">—</span>`;
    el.setAttribute('draggable','false');
    return;
  }

  // Show top card only (P1 discard center — this is what P2 can take)
  const imgUrl = CARD_IMAGES[top.id];
  el.innerHTML = imgUrl
    ? `<img src="${imgUrl}" alt="${top.name}"
        style="width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 0.3s;"
        onload="this.style.opacity=1"
        onerror="this.style.display='none'">`
    : `<div class="card-fallback">
        <span class="cn">${top.value===0?'★':top.value}</span>
        <span class="nm">${top.name.slice(0,6)}</span>
       </div>`;

  // Highlight if human can take
  if (humanState === 'step_draw') {
    el.classList.add('highlight-take');
    el.setAttribute('draggable','true');
  } else {
    el.setAttribute('draggable','false');
  }
}

function renderHumanPlayer() {
  const p2 = getHumanPlayer();
  if (!p2) return;

  // Phase badge
  const badge = document.getElementById('p2PhaseBadge');
  if (p2.phase !== 'none') {
    badge.className = `phase-badge ${p2.phase}`;
    badge.textContent = p2.phase.toUpperCase();
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }

  // Open Pile P2 — ALL cards in row
  const openEl = document.getElementById('p2OpenPile');
  openEl.innerHTML = '';
  if (p2.openPile.length > 0) {
    p2.openPile.forEach(card => {
      const imgUrl = CARD_IMAGES[card.id];
      const div = document.createElement('div');
      div.className = 'open-card';
      div.title = card.name;
      if (imgUrl) {
        div.innerHTML = `<img src="${imgUrl}" alt="${card.name}"
          style="width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 0.3s"
          onload="this.style.opacity=1"
          onerror="this.style.display='none'">`;
      } else {
        div.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:Cinzel,serif;font-size:0.45rem;font-weight:700;">${card.value===0?'★':card.value}</div>`;
      }
      openEl.appendChild(div);
    });
  } else {
    openEl.innerHTML = `<span class="pile-empty">—</span>`;
  }

  // Discard Zone P2 — fan/cascade, scrollable
  const discEl = document.getElementById('p2DiscardZone');
  discEl.innerHTML = '';
  if (p2.discardPile.length > 0) {
    // Create scattered fan wrap
    const fanWrap = document.createElement('div');
    fanWrap.className = 'discard-fan-wrap';

    // Overlap: earlier cards more stacked, recent cards more spread
    const overlap = 28;
    const totalW = Math.max(100, 16 + p2.discardPile.length * overlap);
    fanWrap.style.cssText = `width:${totalW}px;height:76px`;

    p2.discardPile.forEach((card, i) => {
      const imgUrl = CARD_IMAGES[card.id];
      const el = document.createElement('div');
      el.className = 'discard-fan-card';

      // Natural scattered rotation: mix of left & right tilt
      // Uses prime multipliers for pseudo-random but consistent look
      const rotSeed = (i * 13 + i * i * 7) % 30;
      const rot = (rotSeed - 15); // -15 to +15 deg
      const left = 8 + i * overlap;
      // Slight vertical offset for depth
      const top = 4 + (Math.abs((i * 11) % 10) - 5);

      el.style.cssText = `left:${left}px;top:${top}px;transform:rotate(${rot}deg);z-index:${i};`;
      el.title = card.name;

      if (imgUrl) {
        el.innerHTML = `<img src="${imgUrl}" alt="${card.name}"
          style="width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 0.3s"
          onload="this.style.opacity=1"
          onerror="this.style.display='none'">`;
      } else {
        el.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;font-family:Cinzel,serif;font-size:0.5rem;font-weight:700;color:#333;">${card.value===0?'★':card.value}</div>`;
      }
      fanWrap.appendChild(el);
    });
    discEl.appendChild(fanWrap);
    // Auto scroll to latest card
    setTimeout(() => { discEl.scrollLeft = discEl.scrollWidth; }, 50);
  } else {
    discEl.innerHTML = `<span class="pile-empty">—</span>`;
  }

  document.getElementById('p2DiscardCount').textContent =
    p2.discardPile.length > 0 ? `×${p2.discardPile.length}` : '';

  // Hand cards
  renderHumanHand(p2);
}

function renderHumanHand(p2) {
  const handEl = document.getElementById('p2Hand');
  handEl.innerHTML = '';

  const allCards = [...p2.hand, ...p2.openPile];
  const result = findBestCombo(allCards);

  // Mark combo cards
  const comboMap = {};
  for (const combo of result.combos) {
    for (const c of combo.cards) {
      comboMap[c.uid] = combo.type;
    }
  }

  for (const card of p2.hand) {
    const dead = isDeadForSoca(card);
    const gantung = p2.phase === 'none' && isCardGantung(card, HUMAN_IDX) && !dead;
    const comboType = comboMap[card.uid];
    const canDrag = humanState === 'step_discard' ||
                    humanState === 'step_draw' ||
                    humanState === 'timeout';

    let classes = 'card';
    if (canDrag) classes += ' draggable';
    if (dead) classes += ' dead';
    if (gantung) classes += ' gantung';
    if (comboType === 'soca') classes += ' soca-hint';

    const imgUrl = CARD_IMAGES[card.id];
    const cardInner = imgUrl
      ? `<div class="card-img-wrap">
          <img class="card-img" src="${imgUrl}" alt="${card.name}"
            onload="this.style.opacity=1"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <div class="card-fallback" style="display:none">
            <span class="cn">${card.value===0?'★':card.value}</span>
          </div>
         </div>
         <div class="card-overlay"><span class="card-overlay-name">${card.name}</span></div>`
      : `<span class="cn">${card.value===0?'★':card.value}</span>
         <span class="nm">${card.name.slice(0,6)}</span>`;

    const div = document.createElement('div');
    div.className = classes;
    div.setAttribute('data-uid', card.uid);
    div.setAttribute('title', `${card.name}${gantung?' ⚠ GANTUNG':''}${dead?' ☠ Dead':''}`);
    div.innerHTML = cardInner;

    if (canDrag) {
      div.setAttribute('draggable', 'true');
      div.addEventListener('dragstart', e => handleDragStartHand(e, card.uid));
      div.addEventListener('dragend', e => e.currentTarget.classList.remove('dragging'));
    }

    handEl.appendChild(div);
  }
}

function renderCardMini(c, type='discard') {
  const imgUrl = CARD_IMAGES[c.id];
  const style = type === 'open'
    ? 'width:22px;height:38px;border-radius:3px;border:1.5px solid rgba(201,168,76,0.5);background:var(--card-bg);overflow:hidden;position:relative;flex-shrink:0;'
    : 'width:22px;height:38px;border-radius:3px;border:1.5px solid rgba(200,100,50,0.4);background:var(--card-bg);overflow:hidden;position:relative;flex-shrink:0;';
  return imgUrl
    ? `<div style="${style}" title="${c.name}">
        <img src="${imgUrl}" alt="${c.name}"
          style="width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity 0.3s"
          onload="this.style.opacity=1"
          onerror="this.style.display='none'">
       </div>`
    : `<div style="${style}display:flex;align-items:center;justify-content:center;" title="${c.name}">
        <span style="font-family:Cinzel,serif;font-size:0.4rem;font-weight:700;">${c.value===0?'★':c.value}</span>
       </div>`;
}

function renderInfoBar() {
  const infoBar = document.getElementById('infoBar');
  const phaseEl = document.getElementById('phaseInfo');
  const gantungEl = document.getElementById('gantungInfo');

  const phasePlayers = G.players.filter(p => p.phase !== 'none');
  const gantungPlayers = G.players.filter((p,i) => isGantungActive(i));

  phaseEl.innerHTML = phasePlayers.map(p =>
    `<span style="color:${p.phase==='mecari'?'var(--mecari)':'var(--mejaga)'}">
      ${p.name}: ${p.phase.toUpperCase()}
    </span>`
  ).join(' | ');

  gantungEl.innerHTML = gantungPlayers.length > 0
    ? `<span style="color:var(--gantung)">GANTUNG: ${gantungPlayers.map((_,i)=>'P'+(i+1)).join(', ')}</span>`
    : '';

  infoBar.classList.toggle('hidden', phasePlayers.length === 0 && gantungPlayers.length === 0);
}

// ================================================================
// HELPER FUNCTIONS
// ================================================================
function isGantungActive(playerIdx) {
  if (!G) return false;
  const p = G.players[playerIdx];
  if (p.phase !== 'none') return false;
  return p.hand.some(c => isCardGantung(c, playerIdx));
}

function getPlayerEmoji(idx) {
  const emojis = ['🐱','👤','🦊','🐼','🦁'];
  return emojis[idx] || '🎭';
}

function setStatus(msg) {
  document.getElementById('statusText').textContent = msg;
}

function addLog(msg, type='normal') {
  const log = document.getElementById('gameLog');
  const entry = document.createElement('div');
  entry.className = `log-entry log-${type}`;
  entry.textContent = msg;
  log.appendChild(entry);
  log.scrollTop = log.scrollHeight;
}

function toggleLog() {
  const panel = document.getElementById('logPanel');
  logVisible = !logVisible;
  panel.classList.toggle('hidden', !logVisible);
}

// ================================================================
// WINNER / DRAW
// ================================================================
function declareWinner(playerIdx, card) {
  const p = G.players[playerIdx];
  G.phase = 'ended';
  G.winner = playerIdx;

  const isHuman = playerIdx === HUMAN_IDX;
  const phaseLabel = p.phase === 'mejaga' ? '🛡 MEJAGA' : '🔍 MECARI';

  addLog(`🎉 CEKI! ${p.name} MENANG! (${phaseLabel})`, 'ceki');
  addLog(`Kartu menang: ${card.name}`, 'ceki');

  clearTimeout(aiTimer);
  Timer.stop();

  setTimeout(() => {
    document.getElementById('winnerName').textContent =
      `${p.name} ${isHuman ? '(KAMU!) 🎉' : 'MENANG'}`;
    document.getElementById('winnerDetail').textContent =
      `${phaseLabel} — Kartu: ${card.name}`;
    document.getElementById('winnerOverlay').classList.remove('hidden');
  }, 600);
}

// ================================================================
// NEW GAME
// ================================================================
function newGame() {
  clearTimeout(aiTimer);
  Timer.stop();
  setHumanState('idle');
  dragData = null;

  document.getElementById('winnerOverlay').classList.add('hidden');
  document.getElementById('gameLog').innerHTML = '';

  // Build deck
  let deck = buildDeck();
  deck = riffleShuffle(deck);

  const players = [];
  for (let i = 0; i < 5; i++) {
    players.push({
      id: i,
      name: i === HUMAN_IDX ? 'Player 2 (Kamu)' : `Player ${i+1}`,
      hand: [], openPile: [], discardPile: [], lockedPile: [],
      phase: 'none', lockedCards: [], combos: [],
    });
  }

  // Deal 11 cards CCW
  const dealOrder = [0,4,3,2,1];
  let idx = 0;
  for (let r = 0; r < 11; r++) {
    for (let pi of dealOrder) {
      players[pi].hand.push(deck[idx++]);
    }
  }

  G = {
    players,
    drawPile: deck.slice(idx),
    round: 1, turn: 1,
    activePlayer: 0,
    phase: 'playing',
    winner: null,
    startPlayer: 0,
  };

  // Initial combo analysis
  for (const p of G.players) {
    const r = findBestCombo(p.hand);
    p.combos = r.combos;
  }

  addLog('=== GAME BARU DIMULAI ===', 'round');
  addLog('Deck dikocok Riffle 8x — 120 kartu', 'normal');
  addLog('11 kartu dibagikan ke setiap pemain', 'normal');

  renderGame();
  setStatus('Ronde 1 dimulai — P1 giliran pertama');
  scheduleAI();
}

// ================================================================
// CHECK DRAW FOR PHASE PLAYERS
// ================================================================
function checkDrawForPhase(drawnCard, drawingPlayerIdx) {
  if (!G || G.phase === 'ended') return;

  const phasePlayers = G.players.filter((p,i) =>
    i !== drawingPlayerIdx && (p.phase === 'mecari' || p.phase === 'mejaga')
  );
  if (phasePlayers.length === 0) return;

  const winners = phasePlayers.filter(p => checkWin(drawnCard, p));
  if (winners.length === 0) return;

  addLog(`${G.players[drawingPlayerIdx].name} menunjukkan ${drawnCard.name}`, 'normal');

  // Tiebreaker: MEJAGA first, then turn order
  const mejagaWinners = winners.filter(p => p.phase === 'mejaga');
  const pool = mejagaWinners.length > 0 ? mejagaWinners : winners;

  if (pool.length === 1) {
    declareWinner(pool[0].id, drawnCard);
  } else {
    let checkIdx = (drawingPlayerIdx + 1) % 5;
    for (let i = 0; i < 5; i++) {
      const candidate = G.players[checkIdx];
      if (pool.includes(candidate)) {
        declareWinner(candidate.id, drawnCard);
        return;
      }
      checkIdx = (checkIdx + 1) % 5;
    }
  }
}

// ================================================================
// ADVANCE TURN
// ================================================================
function advanceTurn() {
  G.activePlayer = (G.activePlayer + 1) % 5;
  G.turn++;
  if (G.activePlayer === G.startPlayer) G.round++;

  const p = G.players[G.activePlayer];
  const isHuman = G.activePlayer === HUMAN_IDX;
  setStatus(isHuman ? '🎴 Giliran kamu!' : `Giliran ${p.name}...`);
}

// ================================================================
// DRAGEND CLEANUP
// ================================================================
document.addEventListener('dragend', () => {
  document.querySelectorAll('.dragging').forEach(el => el.classList.remove('dragging'));
  document.querySelectorAll('.drop-active').forEach(el => el.classList.remove('drop-active'));
  dragData = null;
});


// ================================================================
// SCROLL DRAG for Discard Pile (touch + mouse)
// ================================================================
function initScrollDrag(el) {
  let isDown = false, startX, scrollLeft;
  el.addEventListener('mousedown', e => {
    // Only activate if not a drag-drop operation
    if (e.target.draggable) return;
    isDown = true;
    el.style.cursor = 'grabbing';
    startX = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
  });
  el.addEventListener('mouseleave', () => { isDown = false; el.style.cursor = 'grab'; });
  el.addEventListener('mouseup',    () => { isDown = false; el.style.cursor = 'grab'; });
  el.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX) * 1.5;
    el.scrollLeft = scrollLeft - walk;
  });
  // Touch
  el.addEventListener('touchstart', e => {
    startX = e.touches[0].pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
  }, { passive:true });
  el.addEventListener('touchmove', e => {
    const x = e.touches[0].pageX - el.offsetLeft;
    el.scrollLeft = scrollLeft - (x - startX) * 1.5;
  }, { passive:true });
}

// Init scroll drag after DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const discZone = document.getElementById('p2DiscardZone');
  if (discZone) initScrollDrag(discZone);
  const openPile = document.getElementById('p2OpenPile');
  if (openPile) initScrollDrag(openPile);
});
// Handle dragleave for drop zones
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.drop-target').forEach(el => {
    el.addEventListener('dragleave', handleDragLeave);
  });
  setStatus('Tekan New Game untuk mulai');
});

