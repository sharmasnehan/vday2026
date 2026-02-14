import React, { useState, useEffect, useRef, useCallback } from 'react';

// ============================================================================
// LOVE QUEST: A 7-Level Journey from Durham UK to Lebanon NH
// ============================================================================

// --- LEVEL DATA ---
const LEVELS = [
  { id: 1, city: 'Durham', country: 'UK', subtitle: 'Prison Break', color: '#6B7280' },
  { id: 2, city: 'Durham', country: 'NC', subtitle: 'Duke Graduation', color: '#1E40AF' },
  { id: 3, city: 'Washington', country: 'DC', subtitle: 'Metro Escape', color: '#DC2626' },
  { id: 4, city: 'Toronto', country: 'CA', subtitle: 'Winter Survival', color: '#0EA5E9' },
  { id: 5, city: 'Pittsburgh', country: 'PA', subtitle: 'Bridge Run', color: '#EAB308' },
  { id: 6, city: 'Morgantown', country: 'WV', subtitle: 'Mountain Ride', color: '#16A34A' },
  { id: 7, city: 'Lebanon', country: 'NH', subtitle: 'The Proposal', color: '#DB2777' },
];

// --- PIXEL ART COMPONENTS ---

const PixelHeart = ({ className = "" }) => (
  <svg viewBox="0 0 12 10" className={`w-full h-full ${className}`} shapeRendering="crispEdges" fill="currentColor">
    <path d="M2,2 h2 v-2 h-2 z M6,2 h2 v-2 h-2 z M0,4 h2 v-2 h-2 z M4,4 h2 v-2 h-2 z M8,4 h2 v-2 h-2 z M10,4 h2 v-2 h-2 z M0,6 h2 v-2 h-2 z M10,6 h2 v-2 h-2 z M2,8 h2 v-2 h-2 z M8,8 h2 v-2 h-2 z M4,10 h2 v-2 h-2 z M6,10 h2 v-2 h-2 z" />
  </svg>
);

const PixelRing = ({ className = "" }) => (
  <svg viewBox="0 0 16 16" className={`w-full h-full ${className}`} shapeRendering="crispEdges">
    <circle cx="8" cy="10" r="5" fill="none" stroke="#EAB308" strokeWidth="2" />
    <rect x="6" y="4" width="4" height="4" fill="#60A5FA" />
    <rect x="7" y="3" width="2" height="1" fill="#93C5FD" />
  </svg>
);

const PixelCharacter = ({ type = "snehan", className = "", style = {} }) => {
  if (type === "snehan") {
    return (
      <svg viewBox="0 0 8 10" className={className} style={style} shapeRendering="crispEdges">
        <rect x="2" y="0" width="4" height="2" fill="#D4A574" />
        <rect x="2" y="1" width="4" height="1" fill="#1a1a1a" />
        <rect x="1" y="2" width="6" height="4" fill="#EF4444" />
        <rect x="2" y="6" width="1" height="2" fill="#1E3A8A" />
        <rect x="5" y="6" width="1" height="2" fill="#1E3A8A" />
        <rect x="2" y="8" width="1" height="2" fill="#8B4513" />
        <rect x="5" y="8" width="1" height="2" fill="#8B4513" />
      </svg>
    );
  }
  if (type === "anahotta") {
    return (
      <svg viewBox="0 0 10 12" className={className} style={style} shapeRendering="crispEdges">
        {/* Black hair - flowing */}
        <rect x="1" y="0" width="8" height="4" fill="#1a1a1a" />
        <rect x="0" y="2" width="1" height="4" fill="#1a1a1a" />
        <rect x="9" y="2" width="1" height="4" fill="#1a1a1a" />
        {/* Face */}
        <rect x="2" y="2" width="6" height="4" fill="#FDBF6F" />
        {/* Large eyes */}
        <rect x="3" y="3" width="2" height="2" fill="#1a1a1a" />
        <rect x="6" y="3" width="2" height="2" fill="#1a1a1a" />
        <rect x="3" y="3" width="1" height="1" fill="#FFF" />
        <rect x="6" y="3" width="1" height="1" fill="#FFF" />
        {/* Smile */}
        <rect x="4" y="5" width="2" height="1" fill="#EC4899" />
        {/* Pink dress */}
        <rect x="2" y="6" width="6" height="4" fill="#EC4899" />
        <rect x="1" y="7" width="1" height="2" fill="#EC4899" />
        <rect x="8" y="7" width="1" height="2" fill="#EC4899" />
        {/* Legs */}
        <rect x="3" y="10" width="2" height="2" fill="#FDBF6F" />
        <rect x="6" y="10" width="2" height="2" fill="#FDBF6F" />
      </svg>
    );
  }
  if (type === "raccoon") {
    return (
      <svg viewBox="0 0 8 8" className={className} style={style} shapeRendering="crispEdges">
        <rect x="1" y="0" width="2" height="2" fill="#4B5563" />
        <rect x="5" y="0" width="2" height="2" fill="#4B5563" />
        <rect x="0" y="2" width="8" height="4" fill="#6B7280" />
        <rect x="1" y="2" width="2" height="2" fill="#1a1a1a" />
        <rect x="5" y="2" width="2" height="2" fill="#1a1a1a" />
        <rect x="3" y="4" width="2" height="1" fill="#1a1a1a" />
        <rect x="1" y="6" width="2" height="2" fill="#4B5563" />
        <rect x="5" y="6" width="2" height="2" fill="#4B5563" />
      </svg>
    );
  }
  if (type === "virus") {
    return (
      <svg viewBox="0 0 10 10" className={className} style={style} shapeRendering="crispEdges">
        <circle cx="5" cy="5" r="3" fill="#22C55E" />
        <rect x="4" y="0" width="2" height="2" fill="#22C55E" />
        <rect x="4" y="8" width="2" height="2" fill="#22C55E" />
        <rect x="0" y="4" width="2" height="2" fill="#22C55E" />
        <rect x="8" y="4" width="2" height="2" fill="#22C55E" />
        <rect x="1" y="1" width="1" height="1" fill="#22C55E" />
        <rect x="8" y="1" width="1" height="1" fill="#22C55E" />
        <rect x="1" y="8" width="1" height="1" fill="#22C55E" />
        <rect x="8" y="8" width="1" height="1" fill="#22C55E" />
      </svg>
    );
  }
  if (type === "paper") {
    return (
      <svg viewBox="0 0 8 10" className={className} style={style} shapeRendering="crispEdges">
        <rect x="0" y="0" width="8" height="10" fill="#F5F5F4" />
        <rect x="1" y="2" width="6" height="1" fill="#A8A29E" />
        <rect x="1" y="4" width="5" height="1" fill="#A8A29E" />
        <rect x="1" y="6" width="6" height="1" fill="#A8A29E" />
        <rect x="1" y="8" width="4" height="1" fill="#A8A29E" />
      </svg>
    );
  }
  if (type === "snowflake") {
    return (
      <svg viewBox="0 0 8 8" className={className} style={style} shapeRendering="crispEdges">
        <rect x="3" y="0" width="2" height="8" fill="#BFDBFE" />
        <rect x="0" y="3" width="8" height="2" fill="#BFDBFE" />
        <rect x="1" y="1" width="1" height="1" fill="#BFDBFE" />
        <rect x="6" y="1" width="1" height="1" fill="#BFDBFE" />
        <rect x="1" y="6" width="1" height="1" fill="#BFDBFE" />
        <rect x="6" y="6" width="1" height="1" fill="#BFDBFE" />
      </svg>
    );
  }
  if (type === "bike") {
    return (
      <svg viewBox="0 0 12 10" className={className} style={style} shapeRendering="crispEdges">
        <circle cx="2" cy="7" r="2" fill="none" stroke="#374151" strokeWidth="1" />
        <circle cx="10" cy="7" r="2" fill="none" stroke="#374151" strokeWidth="1" />
        <path d="M2,7 L6,3 L10,7" fill="none" stroke="#EF4444" strokeWidth="1" />
        <rect x="5" y="1" width="2" height="3" fill="#D4A574" />
      </svg>
    );
  }
  if (type === "car") {
    return (
      <svg viewBox="0 0 12 8" className={className} style={style} shapeRendering="crispEdges">
        <rect x="0" y="2" width="12" height="4" fill="#3B82F6" />
        <rect x="2" y="0" width="8" height="3" fill="#60A5FA" />
        <rect x="3" y="1" width="2" height="2" fill="#BFDBFE" />
        <rect x="7" y="1" width="2" height="2" fill="#BFDBFE" />
        <circle cx="2" cy="6" r="1.5" fill="#1a1a1a" />
        <circle cx="10" cy="6" r="1.5" fill="#1a1a1a" />
      </svg>
    );
  }
  return null;
};

// --- UI COMPONENTS ---

const Button = ({ onClick, children, className = "", color = "red" }) => {
  const colors = {
    red: 'bg-red-500 border-red-900 shadow-[4px_4px_0px_0px_rgba(127,29,29,1)] hover:bg-red-400',
    blue: 'bg-blue-600 border-blue-900 shadow-[4px_4px_0px_0px_rgba(30,58,138,1)] hover:bg-blue-500',
    green: 'bg-green-600 border-green-900 shadow-[4px_4px_0px_0px_rgba(20,83,45,1)] hover:bg-green-500',
    yellow: 'bg-yellow-500 border-yellow-700 shadow-[4px_4px_0px_0px_rgba(161,98,7,1)] hover:bg-yellow-400',
    pink: 'bg-pink-500 border-pink-800 shadow-[4px_4px_0px_0px_rgba(157,23,77,1)] hover:bg-pink-400',
    gray: 'bg-gray-500 border-gray-700 shadow-[4px_4px_0px_0px_rgba(55,65,81,1)] hover:bg-gray-400',
  };
  return (
    <button
      onClick={onClick}
      className={`
        relative px-4 py-2 sm:px-6 sm:py-3 font-pixel text-[8px] sm:text-[10px] uppercase tracking-wider
        text-white border-4 active:shadow-none active:translate-x-1 active:translate-y-1
        transition-colors z-20 ${colors[color]} ${className}
      `}
    >
      {children}
    </button>
  );
};

const ScanlineOverlay = () => (
  <div className="pointer-events-none absolute inset-0 z-50 overflow-hidden opacity-[0.07]">
    <div className="w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
  </div>
);

// --- MOBILE D-PAD ---

const DPad = ({ keysRef }) => {
  const press = (dir) => keysRef.current.add(dir);
  const release = (dir) => keysRef.current.delete(dir);

  const size = 'w-[100px] h-[100px] sm:w-[120px] sm:h-[120px]';
  const btnSize = 'w-[36px] h-[36px] sm:w-[42px] sm:h-[42px]';

  const DirBtn = ({ dir, children, className = "" }) => (
    <button
      className={`absolute z-10 flex items-center justify-center text-neutral-400 active:text-white active:bg-neutral-600 text-[10px] sm:text-sm select-none rounded ${btnSize} ${className}`}
      onPointerDown={(e) => { e.preventDefault(); press(dir); }}
      onPointerUp={() => release(dir)}
      onPointerLeave={() => release(dir)}
      onPointerCancel={() => release(dir)}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}
    </button>
  );

  return (
    <div className={`relative ${size}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] h-full bg-neutral-700 rounded-[3px] border border-neutral-800" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[30%] bg-neutral-700 rounded-[3px] border border-neutral-800" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-neutral-800" />
      <DirBtn dir="up" className="top-0 left-1/2 -translate-x-1/2">▲</DirBtn>
      <DirBtn dir="down" className="bottom-0 left-1/2 -translate-x-1/2">▼</DirBtn>
      <DirBtn dir="left" className="left-0 top-1/2 -translate-y-1/2">◀</DirBtn>
      <DirBtn dir="right" className="right-0 top-1/2 -translate-y-1/2">▶</DirBtn>
    </div>
  );
};

const ActionButton = ({ label, onAction, color = "rose", subLabel = "" }) => {
  const intervalRef = useRef(null);
  const colors = {
    rose: 'bg-rose-600 border-rose-800',
    blue: 'bg-blue-600 border-blue-800',
    green: 'bg-green-600 border-green-800',
    yellow: 'bg-yellow-500 border-yellow-700',
  };

  const start = (e) => {
    e.preventDefault();
    onAction?.();
    intervalRef.current = setInterval(() => onAction?.(), 180);
  };
  const stop = () => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        className={`w-[70px] h-[70px] sm:w-[90px] sm:h-[90px] rounded-full border-[4px] shadow-[4px_4px_0px_rgba(0,0,0,0.3)] active:shadow-none active:translate-x-1 active:translate-y-1 font-pixel text-sm sm:text-base text-white select-none ${colors[color]}`}
        onPointerDown={start}
        onPointerUp={stop}
        onPointerLeave={stop}
        onPointerCancel={stop}
        onContextMenu={(e) => e.preventDefault()}
      >
        {label}
      </button>
      {subLabel && <span className="text-neutral-500 text-[6px] font-sans uppercase">{subLabel}</span>}
    </div>
  );
};

// --- REUNION SCREEN (shown after each level) ---

const ReunionScreen = ({ level, onContinue }) => {
  const levelData = LEVELS[level - 1];
  const isLastLevel = level === 7;

  const backgrounds = {
    1: 'bg-gradient-to-b from-orange-400 via-orange-300 to-pink-300', // Sunset
    2: 'bg-gradient-to-b from-blue-900 via-blue-700 to-blue-500', // Duke blue
    3: 'bg-gradient-to-b from-red-600 via-red-500 to-orange-400', // DC Metro
    4: 'bg-gradient-to-b from-slate-800 via-slate-600 to-cyan-400', // CN Tower
    5: 'bg-gradient-to-b from-yellow-400 via-yellow-300 to-amber-200', // Pittsburgh gold
    6: 'bg-gradient-to-b from-green-700 via-green-500 to-blue-400', // Mountains
    7: 'bg-gradient-to-b from-pink-400 via-pink-300 to-rose-200', // Wedding
  };

  const landmarks = {
    1: '🌅', 2: '🎓', 3: '🚇', 4: '🗼', 5: '🌉', 6: '🏔️', 7: '💒',
  };

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${backgrounds[level]} relative overflow-hidden`}>
      <div className="text-[10px] sm:text-xs text-white/80 mb-2 font-pixel drop-shadow-lg">
        {levelData.city}, {levelData.country}
      </div>
      <div className="text-4xl mb-4">{landmarks[level]}</div>
      <div className="flex items-end gap-4 mb-4">
        <PixelCharacter type="snehan" className="w-10 h-12 sm:w-12 sm:h-14 animate-bounce" />
        {isLastLevel && <div className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse"><PixelRing /></div>}
        <PixelCharacter type="anahotta" className="w-10 h-12 sm:w-12 sm:h-14 animate-bounce" style={{ animationDelay: '0.2s' }} />
      </div>
      <div className="text-white font-pixel text-[10px] sm:text-xs text-center drop-shadow-lg mb-1">
        {isLastLevel ? '' : 'REUNITED!'}
      </div>
      {isLastLevel ? (
        <div className="text-yellow-200 font-pixel text-[8px] sm:text-[10px] text-center drop-shadow-lg mb-4 animate-pulse leading-relaxed">
          ANAHOTTA,<br />WILL YOU MARRY ME?
        </div>
      ) : (
        <div className="text-white/70 font-pixel text-[7px] sm:text-[8px] text-center mb-4">
          Level {level} Complete!
        </div>
      )}
      <Button onClick={onContinue} color={isLastLevel ? 'pink' : 'green'}>
        {isLastLevel ? 'YES! 💍' : 'CONTINUE →'}
      </Button>
      {/* Floating hearts */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 text-white/20 animate-pulse"
          style={{ left: `${10 + i * 12}%`, top: `${20 + (i % 3) * 25}%`, animationDelay: `${i * 0.3}s` }}
        >
          <PixelHeart />
        </div>
      ))}
    </div>
  );
};

// --- VICTORY SCREEN ---

const VictoryScreen = ({ onRestart }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-pink-500 via-rose-400 to-red-400 relative overflow-hidden">
    <div className="text-yellow-200 font-pixel text-sm sm:text-xl mb-2 drop-shadow-lg animate-pulse text-center leading-relaxed">
      💕 HAPPY VALENTINE'S DAY 💕<br />ANAHOTTA!
    </div>
    <div className="text-white/90 font-pixel text-[7px] sm:text-[9px] mb-3 text-center">
      FROM DURHAM TO LEBANON<br />A LOVE STORY
    </div>
    <div className="flex items-end gap-2 mb-3">
      <PixelCharacter type="snehan" className="w-10 h-12 sm:w-12 sm:h-14" />
      <div className="w-6 h-6 sm:w-8 sm:h-8"><PixelRing /></div>
      <PixelCharacter type="anahotta" className="w-10 h-12 sm:w-12 sm:h-14" />
    </div>
    <div className="text-white font-pixel text-[8px] sm:text-[10px] mb-4">
      SNEHAN ❤️ ANAHOTTA
    </div>
    <Button onClick={onRestart} color="pink">PLAY AGAIN</Button>
    {/* Confetti hearts */}
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className="absolute w-3 h-3 text-white/30 animate-bounce"
        style={{
          left: `${Math.random() * 90 + 5}%`,
          top: `${Math.random() * 80 + 10}%`,
          animationDelay: `${Math.random() * 2}s`,
          animationDuration: `${1 + Math.random()}s`
        }}
      >
        <PixelHeart />
      </div>
    ))}
  </div>
);

// ============================================================================
// LEVEL 1: DURHAM UK - PRISON BREAK
// ============================================================================

const Level1_PrisonBreak = ({ onWin, keysRef, actionRef }) => {
  const [playerPos, setPlayerPos] = useState({ x: 10, y: 50 });
  const [guards, setGuards] = useState([]);
  const [walls, setWalls] = useState([]);
  const [keys, setKeys] = useState([]);
  const [hasKey, setHasKey] = useState(false);
  const [doorOpen, setDoorOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  // Initialize level
  useEffect(() => {
    setWalls([
      { x: 30, y: 20, w: 4, h: 60 },
      { x: 60, y: 0, w: 4, h: 50 },
      { x: 60, y: 70, w: 4, h: 30 },
    ]);
    setGuards([
      { id: 1, x: 45, y: 30, dx: 0, dy: 1.2 },
      { id: 2, x: 75, y: 60, dx: 0, dy: -1 },
    ]);
    setKeys([{ id: 1, x: 50, y: 80 }]);
  }, []);

  // Game loop
  useEffect(() => {
    const loop = setInterval(() => {
      // Move player
      setPlayerPos(prev => {
        let { x, y } = prev;
        const k = keysRef.current;
        const speed = 1.8;
        if (k.has('left')) x -= speed;
        if (k.has('right')) x += speed;
        if (k.has('up')) y -= speed;
        if (k.has('down')) y += speed;

        // Wall collision
        for (const wall of walls) {
          if (x > wall.x - 4 && x < wall.x + wall.w + 4 &&
              y > wall.y - 4 && y < wall.y + wall.h + 4) {
            return prev;
          }
        }

        // Door check (right side)
        if (x > 92 && !doorOpen) return prev;

        return { x: Math.max(4, Math.min(96, x)), y: Math.max(4, Math.min(96, y)) };
      });

      // Move guards
      setGuards(prev => prev.map(g => {
        let { x, y, dx, dy } = g;
        y += dy;
        if (y < 10 || y > 90) dy = -dy;
        return { ...g, y, dy };
      }));
    }, 33);

    return () => clearInterval(loop);
  }, [walls, doorOpen]);

  // Collision detection
  useEffect(() => {
    // Key pickup
    const keyHit = keys.find(k => Math.abs(k.x - playerPos.x) < 6 && Math.abs(k.y - playerPos.y) < 6);
    if (keyHit) {
      setKeys(prev => prev.filter(k => k.id !== keyHit.id));
      setHasKey(true);
      setDoorOpen(true);
      setProgress(50);
    }

    // Guard collision (reset)
    const guardHit = guards.find(g => Math.abs(g.x - playerPos.x) < 6 && Math.abs(g.y - playerPos.y) < 6);
    if (guardHit) {
      setPlayerPos({ x: 10, y: 50 });
    }

    // Win condition
    if (playerPos.x > 94 && doorOpen) {
      setProgress(100);
      setTimeout(onWin, 500);
    }
  }, [playerPos, keys, guards, doorOpen, onWin]);

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-gray-800 to-gray-900">
      {/* HUD */}
      <div className="absolute top-1 left-2 text-gray-300 text-[7px] sm:text-[8px] z-10 font-pixel">
        🔑 {hasKey ? '1/1' : '0/1'}
      </div>
      <div className="absolute top-1 right-2 text-gray-400 text-[6px] sm:text-[7px] z-10 font-pixel">
        ESCAPE →
      </div>

      {/* Walls */}
      {walls.map((w, i) => (
        <div
          key={i}
          className="absolute bg-gray-600 border-2 border-gray-500"
          style={{ left: `${w.x}%`, top: `${w.y}%`, width: `${w.w}%`, height: `${w.h}%` }}
        />
      ))}

      {/* Door */}
      <div
        className={`absolute right-0 top-[40%] w-[4%] h-[20%] border-2 ${doorOpen ? 'bg-green-600 border-green-400' : 'bg-red-900 border-red-700'}`}
      />

      {/* Keys */}
      {keys.map(k => (
        <div
          key={k.id}
          className="absolute w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 animate-pulse"
          style={{ left: `${k.x}%`, top: `${k.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          🔑
        </div>
      ))}

      {/* Guards */}
      {guards.map(g => (
        <div
          key={g.id}
          className="absolute w-5 h-6 sm:w-6 sm:h-7 text-2xl"
          style={{ left: `${g.x}%`, top: `${g.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          👮
        </div>
      ))}

      {/* Player */}
      <PixelCharacter
        type="snehan"
        className="absolute w-6 h-7 sm:w-7 sm:h-8 z-10"
        style={{ left: `${playerPos.x}%`, top: `${playerPos.y}%`, transform: 'translate(-50%, -50%)' }}
      />

      {/* Prison bars overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute top-0 bottom-0 w-[2px] bg-gray-400" style={{ left: `${12 + i * 12}%` }} />
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// LEVEL 2: DURHAM NC - DUKE GRADUATION
// ============================================================================

const Level2_DukeGraduation = ({ onWin, keysRef, actionRef }) => {
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 85 });
  const [papers, setPapers] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30);
  const targetScore = 8;

  // Spawn papers
  useEffect(() => {
    const spawn = setInterval(() => {
      setPapers(prev => [...prev, {
        id: Math.random(),
        x: Math.random() * 80 + 10,
        y: -5,
        type: Math.random() > 0.3 ? 'paper' : 'exam',
        speed: 0.8 + Math.random() * 0.5,
      }]);
    }, 800);

    const countdown = setInterval(() => {
      setTimer(t => Math.max(0, t - 1));
    }, 1000);

    return () => { clearInterval(spawn); clearInterval(countdown); };
  }, []);

  // Game loop
  useEffect(() => {
    const loop = setInterval(() => {
      setPlayerPos(prev => {
        let { x, y } = prev;
        const k = keysRef.current;
        if (k.has('left')) x -= 2;
        if (k.has('right')) x += 2;
        return { x: Math.max(5, Math.min(95, x)), y };
      });

      setPapers(prev => prev
        .map(p => ({ ...p, y: p.y + p.speed }))
        .filter(p => p.y < 105)
      );
    }, 33);

    return () => clearInterval(loop);
  }, []);

  // Collision
  useEffect(() => {
    const hit = papers.find(p => Math.abs(p.x - playerPos.x) < 8 && Math.abs(p.y - playerPos.y) < 10);
    if (hit) {
      setPapers(prev => prev.filter(p => p.id !== hit.id));
      setScore(s => {
        const ns = s + 1;
        if (ns >= targetScore) setTimeout(onWin, 500);
        return ns;
      });
    }
  }, [papers, playerPos, onWin]);

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700">
      {/* HUD */}
      <div className="absolute top-1 left-2 text-white text-[7px] sm:text-[8px] z-10 font-pixel">
        📚 {score}/{targetScore}
      </div>
      <div className="absolute top-1 right-2 text-yellow-300 text-[7px] sm:text-[8px] z-10 font-pixel">
        ⏱️ {timer}s
      </div>

      {/* Duke Chapel silhouette */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-blue-600 text-3xl sm:text-4xl opacity-30">
        🏛️
      </div>

      {/* Papers */}
      {papers.map(p => (
        <div
          key={p.id}
          className="absolute w-5 h-6 sm:w-6 sm:h-7"
          style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          {p.type === 'exam' ? (
            <div className="text-lg sm:text-xl">📝</div>
          ) : (
            <PixelCharacter type="paper" className="w-full h-full" />
          )}
        </div>
      ))}

      {/* Player with graduation cap */}
      <div
        className="absolute z-10"
        style={{ left: `${playerPos.x}%`, top: `${playerPos.y}%`, transform: 'translate(-50%, -50%)' }}
      >
        <div className="text-sm -mb-1">🎓</div>
        <PixelCharacter type="snehan" className="w-7 h-8 sm:w-8 sm:h-9" />
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-[8%] bg-green-800" />
    </div>
  );
};

// ============================================================================
// LEVEL 3: WASHINGTON DC - METRO ESCAPE
// ============================================================================

const Level3_MetroEscape = ({ onWin, keysRef, actionRef }) => {
  const [playerPos, setPlayerPos] = useState({ x: 10, y: 50 });
  const [viruses, setViruses] = useState([]);
  const [masks, setMasks] = useState([]);
  const [hasMask, setHasMask] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stations] = useState(['TENLEYTOWN', 'VAN NESS', 'CLEVELAND PARK', 'WOODLEY PARK', 'DUPONT']);

  // Spawn obstacles
  useEffect(() => {
    const spawn = setInterval(() => {
      if (Math.random() > 0.5) {
        setViruses(prev => [...prev, {
          id: Math.random(),
          x: 100 + Math.random() * 20,
          y: 30 + Math.random() * 40,
          speed: 1 + Math.random() * 0.5,
        }]);
      }
    }, 600);

    // Spawn masks occasionally
    const maskSpawn = setInterval(() => {
      if (!hasMask && Math.random() > 0.7) {
        setMasks(prev => [...prev, {
          id: Math.random(),
          x: 80 + Math.random() * 15,
          y: 30 + Math.random() * 40,
        }]);
      }
    }, 2000);

    return () => { clearInterval(spawn); clearInterval(maskSpawn); };
  }, [hasMask]);

  // Game loop
  useEffect(() => {
    const loop = setInterval(() => {
      setPlayerPos(prev => {
        let { x, y } = prev;
        const k = keysRef.current;
        if (k.has('up')) y -= 1.5;
        if (k.has('down')) y += 1.5;
        if (k.has('right')) x += 1.2;
        return { x: Math.min(95, x), y: Math.max(15, Math.min(85, y)) };
      });

      setViruses(prev => prev
        .map(v => ({ ...v, x: v.x - v.speed }))
        .filter(v => v.x > -10)
      );

      setMasks(prev => prev.map(m => ({ ...m, x: m.x - 0.5 })).filter(m => m.x > -5));
    }, 33);

    return () => clearInterval(loop);
  }, []);

  // Collision & progress
  useEffect(() => {
    // Mask pickup
    const maskHit = masks.find(m => Math.abs(m.x - playerPos.x) < 6 && Math.abs(m.y - playerPos.y) < 6);
    if (maskHit) {
      setMasks(prev => prev.filter(m => m.id !== maskHit.id));
      setHasMask(true);
      setTimeout(() => setHasMask(false), 5000); // Mask lasts 5 seconds
    }

    // Virus collision
    if (!hasMask) {
      const virusHit = viruses.find(v => Math.abs(v.x - playerPos.x) < 5 && Math.abs(v.y - playerPos.y) < 5);
      if (virusHit) {
        setPlayerPos(p => ({ ...p, x: Math.max(10, p.x - 15) }));
        setViruses(prev => prev.filter(v => v.id !== virusHit.id));
      }
    }

    // Progress
    const newProgress = Math.floor((playerPos.x / 95) * 100);
    setProgress(newProgress);
    if (playerPos.x >= 94) {
      setTimeout(onWin, 500);
    }
  }, [playerPos, viruses, masks, hasMask, onWin]);

  const currentStation = stations[Math.min(4, Math.floor(progress / 20))];

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-gray-900 via-red-900 to-gray-900">
      {/* Metro line */}
      <div className="absolute top-[10%] left-0 right-0 h-1 bg-red-600" />

      {/* Station indicator */}
      <div className="absolute top-1 left-1/2 -translate-x-1/2 text-white text-[6px] sm:text-[7px] z-10 font-pixel bg-red-800 px-2 py-1 rounded">
        {currentStation}
      </div>

      {/* Mask indicator */}
      <div className="absolute top-1 right-2 text-[7px] sm:text-[8px] z-10 font-pixel">
        {hasMask ? '😷' : '🫁'}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-2 left-2 right-2 h-2 bg-gray-800 rounded">
        <div className="h-full bg-red-500 rounded transition-all" style={{ width: `${progress}%` }} />
      </div>

      {/* Viruses */}
      {viruses.map(v => (
        <PixelCharacter
          key={v.id}
          type="virus"
          className="absolute w-5 h-5 sm:w-6 sm:h-6"
          style={{ left: `${v.x}%`, top: `${v.y}%`, transform: 'translate(-50%, -50%)' }}
        />
      ))}

      {/* Masks */}
      {masks.map(m => (
        <div
          key={m.id}
          className="absolute text-lg sm:text-xl animate-bounce"
          style={{ left: `${m.x}%`, top: `${m.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          😷
        </div>
      ))}

      {/* Player */}
      <div
        className="absolute z-10"
        style={{ left: `${playerPos.x}%`, top: `${playerPos.y}%`, transform: 'translate(-50%, -50%)' }}
      >
        {hasMask && <div className="text-[8px] -mb-1 text-center">😷</div>}
        <PixelCharacter type="snehan" className="w-6 h-7 sm:w-7 sm:h-8" />
      </div>

      {/* Metro car outline */}
      <div className="absolute top-[15%] bottom-[15%] left-0 right-0 border-4 border-gray-700 rounded-lg pointer-events-none" />
    </div>
  );
};

// ============================================================================
// LEVEL 4: TORONTO - WINTER SURVIVAL
// ============================================================================

const Level4_TorontoWinter = ({ onWin, keysRef, actionRef }) => {
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 80 });
  const [snowflakes, setSnowflakes] = useState([]);
  const [raccoons, setRaccoons] = useState([]);
  const [score, setScore] = useState(0);
  const [projectiles, setProjectiles] = useState([]);
  const targetScore = 6;

  // Set up action button
  useEffect(() => {
    actionRef.current = () => {
      setProjectiles(prev => [...prev, {
        id: Math.random(),
        x: playerPos.x,
        y: playerPos.y - 5,
      }]);
    };
    return () => { actionRef.current = null; };
  }, [playerPos]);

  // Spawn enemies
  useEffect(() => {
    const snowSpawn = setInterval(() => {
      setSnowflakes(prev => [...prev, {
        id: Math.random(),
        x: Math.random() * 100,
        y: -5,
        speed: 0.5 + Math.random() * 0.5,
      }]);
    }, 200);

    const raccoonSpawn = setInterval(() => {
      setRaccoons(prev => [...prev, {
        id: Math.random(),
        x: Math.random() > 0.5 ? -5 : 105,
        y: 25 + Math.random() * 35, // Float much higher (25-60% from top)
        dx: Math.random() > 0.5 ? 0.6 : -0.6,
      }]);
    }, 1500);

    return () => { clearInterval(snowSpawn); clearInterval(raccoonSpawn); };
  }, []);

  // Game loop
  useEffect(() => {
    const loop = setInterval(() => {
      setPlayerPos(prev => {
        let { x, y } = prev;
        const k = keysRef.current;
        if (k.has('left')) x -= 2;
        if (k.has('right')) x += 2;
        if (k.has('up')) y -= 1.5;
        if (k.has('down')) y += 1.5;
        return { x: Math.max(5, Math.min(95, x)), y: Math.max(30, Math.min(90, y)) };
      });

      setSnowflakes(prev => prev
        .map(s => ({ ...s, y: s.y + s.speed, x: s.x + Math.sin(s.y / 10) * 0.3 }))
        .filter(s => s.y < 105)
      );

      setRaccoons(prev => prev
        .map(r => ({ ...r, x: r.x + r.dx }))
        .filter(r => r.x > -10 && r.x < 110)
      );

      setProjectiles(prev => prev
        .map(p => ({ ...p, y: p.y - 3 }))
        .filter(p => p.y > -5)
      );
    }, 33);

    return () => clearInterval(loop);
  }, []);

  // Collision
  useEffect(() => {
    // Snowball hits raccoon
    for (const raccoon of raccoons) {
      const hit = projectiles.find(p => Math.abs(p.x - raccoon.x) < 6 && Math.abs(p.y - raccoon.y) < 6);
      if (hit) {
        setRaccoons(prev => prev.filter(r => r.id !== raccoon.id));
        setProjectiles(prev => prev.filter(p => p.id !== hit.id));
        setScore(s => {
          const ns = s + 1;
          if (ns >= targetScore) setTimeout(onWin, 500);
          return ns;
        });
        break;
      }
    }

    // Raccoon hits player
    const raccoonHit = raccoons.find(r => Math.abs(r.x - playerPos.x) < 6 && Math.abs(r.y - playerPos.y) < 6);
    if (raccoonHit) {
      setPlayerPos({ x: 50, y: 80 });
      setRaccoons(prev => prev.filter(r => r.id !== raccoonHit.id));
    }
  }, [raccoons, projectiles, playerPos, onWin]);

  return (
    <div className="w-full h-full relative bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 overflow-hidden">
      {/* CN Tower */}
      <div className="absolute top-2 right-4 text-3xl sm:text-4xl opacity-40">🗼</div>

      {/* HUD */}
      <div className="absolute top-1 left-2 text-slate-800 text-[7px] sm:text-[8px] z-10 font-pixel">
        🦝 {score}/{targetScore}
      </div>

      {/* Snowflakes */}
      {snowflakes.map(s => (
        <PixelCharacter
          key={s.id}
          type="snowflake"
          className="absolute w-3 h-3 sm:w-4 sm:h-4 opacity-70"
          style={{ left: `${s.x}%`, top: `${s.y}%`, transform: 'translate(-50%, -50%)' }}
        />
      ))}

      {/* Raccoons */}
      {raccoons.map(r => (
        <PixelCharacter
          key={r.id}
          type="raccoon"
          className="absolute w-6 h-6 sm:w-7 sm:h-7"
          style={{ left: `${r.x}%`, top: `${r.y}%`, transform: `translate(-50%, -50%) scaleX(${r.dx > 0 ? 1 : -1})` }}
        />
      ))}

      {/* Snowballs */}
      {projectiles.map(p => (
        <div
          key={p.id}
          className="absolute w-3 h-3 bg-white rounded-full border border-gray-300"
          style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}
        />
      ))}

      {/* Player */}
      <PixelCharacter
        type="snehan"
        className="absolute w-7 h-8 sm:w-8 sm:h-9 z-10"
        style={{ left: `${playerPos.x}%`, top: `${playerPos.y}%`, transform: 'translate(-50%, -50%)' }}
      />

      {/* Ground snow */}
      <div className="absolute bottom-0 left-0 right-0 h-[10%] bg-white/80" />
    </div>
  );
};

// ============================================================================
// LEVEL 5: PITTSBURGH - BRIDGE PUZZLE (Three Rivers Logic Game)
// ============================================================================

const Level5_PittsburghBridges = ({ onWin, keysRef, actionRef }) => {
  // Pittsburgh has 3 rivers meeting - player must navigate the correct bridge sequence
  const [playerPos, setPlayerPos] = useState({ x: 10, y: 75 });
  const [currentZone, setCurrentZone] = useState(0); // 0=start, 1-3=zones, 4=end
  const [bridgeStates, setBridgeStates] = useState([false, false, false]); // raised/lowered
  const [sequence, setSequence] = useState([]);
  const [targetSequence] = useState([1, 0, 2]); // Must cross bridges in this order
  const [message, setMessage] = useState('CROSS BRIDGES: 2→1→3');

  // Set up action button to toggle nearest bridge
  useEffect(() => {
    actionRef.current = () => {
      // Find which bridge player is near
      const bridgeZones = [
        { id: 0, x: 30, y: 50 },
        { id: 1, x: 55, y: 35 },
        { id: 2, x: 75, y: 65 },
      ];
      const nearBridge = bridgeZones.find(b => 
        Math.abs(playerPos.x - b.x) < 12 && Math.abs(playerPos.y - b.y) < 15
      );
      if (nearBridge !== undefined) {
        setBridgeStates(prev => {
          const next = [...prev];
          next[nearBridge.id] = !next[nearBridge.id];
          return next;
        });
      }
    };
    return () => { actionRef.current = null; };
  }, [playerPos]);

  // Game loop
  useEffect(() => {
    const loop = setInterval(() => {
      setPlayerPos(prev => {
        let { x, y } = prev;
        const k = keysRef.current;
        if (k.has('left')) x -= 1.5;
        if (k.has('right')) x += 1.5;
        if (k.has('up')) y -= 1.5;
        if (k.has('down')) y += 1.5;
        return { x: Math.max(5, Math.min(95, x)), y: Math.max(10, Math.min(90, y)) };
      });
    }, 33);

    return () => clearInterval(loop);
  }, []);

  // Check bridge crossings and win condition
  useEffect(() => {
    const bridgeZones = [
      { id: 0, x: 30, y: 50, label: '1' },
      { id: 1, x: 55, y: 35, label: '2' },
      { id: 2, x: 75, y: 65, label: '3' },
    ];

    // Check if crossing a bridge
    for (const bridge of bridgeZones) {
      if (Math.abs(playerPos.x - bridge.x) < 8 && Math.abs(playerPos.y - bridge.y) < 10) {
        if (bridgeStates[bridge.id]) { // Bridge is lowered
          if (sequence[sequence.length - 1] !== bridge.id) {
            setSequence(prev => {
              const next = [...prev, bridge.id];
              // Check if sequence matches
              const isCorrect = next.every((v, i) => v === targetSequence[i]);
              if (next.length === 3 && isCorrect) {
                setMessage('PERFECT! 🎉');
                setTimeout(onWin, 800);
              } else if (next.length >= 3 && !isCorrect) {
                setMessage('WRONG ORDER! RETRY');
                setTimeout(() => {
                  setSequence([]);
                  setPlayerPos({ x: 10, y: 75 });
                  setMessage('CROSS BRIDGES: 2→1→3');
                }, 1000);
                return [];
              }
              return next;
            });
          }
        }
      }
    }
  }, [playerPos, bridgeStates, sequence, targetSequence, onWin]);

  const bridgeData = [
    { id: 0, x: 25, y: 45, w: 18, h: 20, label: '1', angle: -15 },
    { id: 1, x: 48, y: 28, w: 20, h: 18, label: '2', angle: 10 },
    { id: 2, x: 68, y: 58, w: 18, h: 20, label: '3', angle: -5 },
  ];

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-500 via-slate-600 to-slate-700" />

      {/* Three Rivers confluence */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Allegheny River */}
        <path d="M0,30 Q30,35 50,50" fill="none" stroke="#3B82F6" strokeWidth="12" opacity="0.6" />
        {/* Monongahela River */}
        <path d="M0,70 Q30,65 50,50" fill="none" stroke="#3B82F6" strokeWidth="12" opacity="0.6" />
        {/* Ohio River */}
        <path d="M50,50 Q75,50 100,45" fill="none" stroke="#3B82F6" strokeWidth="14" opacity="0.6" />
      </svg>

      {/* Land masses */}
      <div className="absolute top-0 left-0 w-[25%] h-[40%] bg-green-800 rounded-br-3xl" />
      <div className="absolute bottom-0 left-0 w-[30%] h-[35%] bg-green-800 rounded-tr-3xl" />
      <div className="absolute top-[20%] right-0 w-[30%] h-[60%] bg-green-800 rounded-l-3xl" />

      {/* Pittsburgh skyline silhouette */}
      <div className="absolute top-2 right-4 text-slate-600 text-2xl opacity-50">🏙️</div>

      {/* Bridges - Yellow Pittsburgh style */}
      {bridgeData.map((bridge) => (
        <div
          key={bridge.id}
          className={`absolute transition-all duration-300 ${bridgeStates[bridge.id] ? 'opacity-100' : 'opacity-40'}`}
          style={{
            left: `${bridge.x}%`,
            top: `${bridge.y}%`,
            width: `${bridge.w}%`,
            height: `${bridge.h}%`,
            transform: `rotate(${bridge.angle}deg)`,
          }}
        >
          {/* Bridge structure - Pittsburgh yellow suspension style */}
          <div className="relative w-full h-full">
            {/* Main deck */}
            <div className={`absolute top-1/2 left-0 right-0 h-[30%] -translate-y-1/2 ${bridgeStates[bridge.id] ? 'bg-yellow-400' : 'bg-yellow-900'} border-2 border-yellow-600 rounded`} />
            {/* Towers */}
            <div className={`absolute left-[10%] top-[10%] w-[8%] h-[80%] ${bridgeStates[bridge.id] ? 'bg-yellow-500' : 'bg-yellow-800'} rounded`} />
            <div className={`absolute right-[10%] top-[10%] w-[8%] h-[80%] ${bridgeStates[bridge.id] ? 'bg-yellow-500' : 'bg-yellow-800'} rounded`} />
            {/* Cables */}
            <div className="absolute top-[20%] left-[14%] right-[14%] h-[2px] bg-yellow-600" />
            <div className="absolute top-[25%] left-[14%] right-[14%] h-[1px] bg-yellow-600" />
            {/* Label */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-pixel text-[8px] ${bridgeStates[bridge.id] ? 'text-yellow-900' : 'text-yellow-600'}`}>
              {bridge.label}
            </div>
          </div>
        </div>
      ))}

      {/* HUD */}
      <div className="absolute top-1 left-2 text-yellow-300 text-[6px] sm:text-[7px] z-10 font-pixel bg-slate-800/70 px-2 py-1 rounded">
        {message}
      </div>
      <div className="absolute top-1 right-2 text-white text-[6px] sm:text-[7px] z-10 font-pixel">
        CROSSED: {sequence.map(s => s + 1).join('→') || '-'}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-yellow-200/70 text-[5px] sm:text-[6px] font-pixel text-center">
        A BUTTON = TOGGLE BRIDGE
      </div>

      {/* Player */}
      <PixelCharacter
        type="snehan"
        className="absolute w-5 h-6 sm:w-6 sm:h-7 z-20"
        style={{ left: `${playerPos.x}%`, top: `${playerPos.y}%`, transform: 'translate(-50%, -50%)' }}
      />
    </div>
  );
};

// ============================================================================
// LEVEL 6: MORGANTOWN - RIVER TRAIL (Lane-switching bike game)
// ============================================================================

const Level6_MorgantownBike = ({ onWin, keysRef, actionRef }) => {
  const [playerLane, setPlayerLane] = useState(1); // 0=top, 1=middle, 2=bottom
  const [score, setScore] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [gems, setGems] = useState([]);
  const [canSwitch, setCanSwitch] = useState(true);
  const targetScore = 8;

  // Spawn gems and obstacles
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      // Spawn gem in a random lane
      const gemLane = Math.floor(Math.random() * 3);
      setGems(prev => {
        if (prev.length >= 2) return prev;
        return [...prev, {
          id: Math.random(),
          x: 105,
          lane: gemLane,
        }];
      });

      // Spawn obstacle in a different lane
      const obsLane = (gemLane + 1 + Math.floor(Math.random() * 2)) % 3;
      if (Math.random() > 0.4) {
        setObstacles(prev => [...prev, {
          id: Math.random(),
          x: 110 + Math.random() * 15,
          lane: obsLane,
        }]);
      }
    }, 1000);

    return () => clearInterval(spawnInterval);
  }, []);

  // Game loop
  useEffect(() => {
    const loop = setInterval(() => {
      // Handle lane switching with debounce
      const k = keysRef.current;
      if (canSwitch) {
        if (k.has('up')) {
          setPlayerLane(prev => Math.max(0, prev - 1));
          setCanSwitch(false);
          setTimeout(() => setCanSwitch(true), 150);
        } else if (k.has('down')) {
          setPlayerLane(prev => Math.min(2, prev + 1));
          setCanSwitch(false);
          setTimeout(() => setCanSwitch(true), 150);
        }
      }

      // Scroll world
      setScrollX(x => x + 1);

      // Move items
      setGems(prev => prev.map(g => ({ ...g, x: g.x - 2 })).filter(g => g.x > -10));
      setObstacles(prev => prev.map(o => ({ ...o, x: o.x - 2 })).filter(o => o.x > -10));
    }, 33);

    return () => clearInterval(loop);
  }, [canSwitch]);

  // Collision detection
  useEffect(() => {
    const playerX = 20;

    // Gem collection - check if gem is in same lane and close enough
    const gemHit = gems.find(g => g.lane === playerLane && Math.abs(g.x - playerX) < 10);
    if (gemHit) {
      setGems(prev => prev.filter(g => g.id !== gemHit.id));
      setScore(s => {
        const ns = s + 1;
        if (ns >= targetScore) setTimeout(onWin, 500);
        return ns;
      });
    }

    // Obstacle collision - same lane check
    const obsHit = obstacles.find(o => o.lane === playerLane && Math.abs(o.x - playerX) < 8);
    if (obsHit) {
      setObstacles(prev => prev.filter(o => o.id !== obsHit.id));
      setScore(s => Math.max(0, s - 1));
    }
  }, [gems, obstacles, playerLane, onWin]);

  // Convert lane to Y position
  const laneToY = (lane) => lane === 0 ? 25 : lane === 1 ? 50 : 75;
  const laneY = laneToY(playerLane);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Parallax sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-400 to-emerald-300" />

      {/* Distant mountains (parallax slow) */}
      <div className="absolute top-[5%] left-0 right-0 h-[30%]" style={{ transform: `translateX(${-scrollX * 0.1}px)` }}>
        <svg viewBox="0 0 200 40" className="w-[200%] h-full" preserveAspectRatio="none">
          <polygon points="0,40 20,10 40,40" fill="#166534" opacity="0.5" />
          <polygon points="30,40 55,5 80,40" fill="#15803d" opacity="0.5" />
          <polygon points="70,40 100,8 130,40" fill="#166534" opacity="0.5" />
          <polygon points="110,40 140,12 170,40" fill="#15803d" opacity="0.5" />
          <polygon points="150,40 180,6 200,40" fill="#166534" opacity="0.5" />
        </svg>
      </div>

      {/* River winding through (parallax medium) */}
      <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 100 100" style={{ transform: `translateX(${-scrollX * 0.3 % 100}px)` }}>
        <path d="M-20,50 Q0,30 20,50 T60,50 T100,50 T140,50" fill="none" stroke="#3B82F6" strokeWidth="15" />
      </svg>

      {/* Three lanes - gravel paths */}
      {[25, 50, 75].map((y, i) => (
        <div
          key={i}
          className={`absolute left-0 right-0 h-[18%] ${playerLane === i ? 'bg-amber-600/60' : 'bg-amber-800/40'} border-y border-amber-900/30`}
          style={{ top: `${y - 9}%` }}
        >
          {/* Gravel texture */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: 'radial-gradient(circle, #78716c 1px, transparent 1px)',
            backgroundSize: '8px 8px',
            transform: `translateX(${-scrollX % 8}px)`,
          }} />
        </div>
      ))}

      {/* Lane labels */}
      <div className="absolute left-1 top-[20%] text-[6px] text-amber-200/60 font-pixel">HIGH</div>
      <div className="absolute left-1 top-[45%] text-[6px] text-amber-200/60 font-pixel">MID</div>
      <div className="absolute left-1 top-[70%] text-[6px] text-amber-200/60 font-pixel">LOW</div>

      {/* HUD */}
      <div className="absolute top-1 left-2 text-white text-[7px] sm:text-[8px] z-10 font-pixel drop-shadow bg-green-900/50 px-2 py-1 rounded">
        🚴 {score}/{targetScore}
      </div>
      <div className="absolute top-1 right-2 text-amber-200 text-[6px] z-10 font-pixel">
        ↑↓ SWITCH LANE
      </div>

      {/* Gems (collectibles) */}
      {gems.map(g => (
        <div
          key={g.id}
          className="absolute w-5 h-5 sm:w-6 sm:h-6 animate-pulse"
          style={{ left: `${g.x}%`, top: `${laneToY(g.lane)}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="w-full h-full bg-emerald-400 rounded-full border-2 border-emerald-600 shadow-lg shadow-emerald-400/50" />
        </div>
      ))}

      {/* Obstacles (rocks) */}
      {obstacles.map(o => (
        <div
          key={o.id}
          className="absolute text-xl sm:text-2xl"
          style={{ left: `${o.x}%`, top: `${laneToY(o.lane)}%`, transform: 'translate(-50%, -50%)' }}
        >
          🪨
        </div>
      ))}

      {/* Player on bike */}
      <div
        className="absolute z-10 transition-all duration-150"
        style={{ left: '20%', top: `${laneY}%`, transform: 'translate(-50%, -50%)' }}
      >
        <PixelCharacter type="bike" className="w-10 h-8 sm:w-12 sm:h-10" />
      </div>

      {/* Trees on sides */}
      <div className="absolute top-[10%] left-[2%] text-2xl opacity-60">🌲</div>
      <div className="absolute top-[60%] left-[5%] text-xl opacity-50">🌲</div>
      <div className="absolute top-[30%] right-[3%] text-2xl opacity-60">🌲</div>
      <div className="absolute top-[75%] right-[6%] text-xl opacity-50">🌲</div>
    </div>
  );
};

// ============================================================================
// LEVEL 7: LEBANON NH - THE PROPOSAL (Dartmouth Green)
// ============================================================================

const Level7_LebanonProposal = ({ onWin, keysRef, actionRef }) => {
  const [playerPos, setPlayerPos] = useState({ x: 10, y: 50 });
  const [rings, setRings] = useState([
    { id: 1, x: 30, y: 40 },
    { id: 2, x: 55, y: 60 },
    { id: 3, x: 80, y: 35 },
  ]);
  const [collected, setCollected] = useState(0);
  const [obstacles, setObstacles] = useState([]);

  // Spawn obstacles (books flying)
  useEffect(() => {
    const spawn = setInterval(() => {
      setObstacles(prev => [...prev, {
        id: Math.random(),
        x: 105,
        y: 20 + Math.random() * 60,
        speed: 0.8 + Math.random() * 0.4,
      }]);
    }, 1500);

    return () => clearInterval(spawn);
  }, []);

  // Game loop
  useEffect(() => {
    const loop = setInterval(() => {
      setPlayerPos(prev => {
        let { x, y } = prev;
        const k = keysRef.current;
        if (k.has('left')) x -= 1.8;
        if (k.has('right')) x += 1.8;
        if (k.has('up')) y -= 1.8;
        if (k.has('down')) y += 1.8;
        return { x: Math.max(5, Math.min(95, x)), y: Math.max(20, Math.min(85, y)) };
      });

      setObstacles(prev => prev
        .map(o => ({ ...o, x: o.x - o.speed }))
        .filter(o => o.x > -10)
      );
    }, 33);

    return () => clearInterval(loop);
  }, []);

  // Collision
  useEffect(() => {
    // Ring collection
    const ringHit = rings.find(r => Math.abs(r.x - playerPos.x) < 6 && Math.abs(r.y - playerPos.y) < 6);
    if (ringHit) {
      setRings(prev => prev.filter(r => r.id !== ringHit.id));
      setCollected(c => {
        const nc = c + 1;
        if (nc >= 3) setTimeout(onWin, 800);
        return nc;
      });
    }

    // Obstacle collision
    const obsHit = obstacles.find(o => Math.abs(o.x - playerPos.x) < 5 && Math.abs(o.y - playerPos.y) < 5);
    if (obsHit) {
      setPlayerPos(p => ({ ...p, x: Math.max(10, p.x - 10) }));
      setObstacles(prev => prev.filter(o => o.id !== obsHit.id));
    }
  }, [playerPos, rings, obstacles, onWin]);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Dartmouth dark green background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00693E] via-[#004F2D] to-[#003D22]" />

      {/* Baker Library tower silhouette */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] h-[35%] flex flex-col items-center">
        {/* Tower */}
        <div className="w-[20%] h-[70%] bg-[#002D1A] rounded-t" />
        {/* Spire */}
        <div className="w-0 h-0 border-l-[8px] border-r-[8px] border-b-[20px] border-l-transparent border-r-transparent border-b-[#002D1A] -mt-1 rotate-180" />
        {/* Main building */}
        <div className="w-full h-[30%] bg-[#002D1A] -mt-2 rounded-t" />
      </div>

      {/* Dartmouth text */}
      <div className="absolute top-[38%] left-1/2 -translate-x-1/2 text-[#00693E] text-[8px] sm:text-[10px] font-pixel tracking-wider opacity-60">
        DARTMOUTH
      </div>

      {/* The Green (lawn) */}
      <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-[#1B5E20] via-[#2E7D32] to-[#388E3C] opacity-80" />

      {/* Pine trees around the edges */}
      <div className="absolute bottom-[50%] left-[5%] text-2xl opacity-70">🌲</div>
      <div className="absolute bottom-[55%] left-[15%] text-xl opacity-60">🌲</div>
      <div className="absolute bottom-[48%] right-[8%] text-2xl opacity-70">🌲</div>
      <div className="absolute bottom-[52%] right-[18%] text-xl opacity-60">🌲</div>
      <div className="absolute bottom-[45%] left-[25%] text-lg opacity-50">🌲</div>
      <div className="absolute bottom-[47%] right-[28%] text-lg opacity-50">🌲</div>

      {/* White fence/path lines */}
      <div className="absolute bottom-[20%] left-[10%] right-[10%] h-[2px] bg-white/20" />
      <div className="absolute bottom-[35%] left-[15%] right-[15%] h-[1px] bg-white/10" />

      {/* HUD */}
      <div className="absolute top-1 left-2 text-yellow-300 text-[7px] sm:text-[8px] z-10 font-pixel bg-[#002D1A]/70 px-2 py-1 rounded">
        💍 {collected}/3
      </div>

      {/* Rings */}
      {rings.map(r => (
        <div
          key={r.id}
          className="absolute w-6 h-6 sm:w-8 sm:h-8 animate-bounce"
          style={{ left: `${r.x}%`, top: `${r.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <PixelRing />
        </div>
      ))}

      {/* Obstacles (books) */}
      {obstacles.map(o => (
        <div
          key={o.id}
          className="absolute text-lg sm:text-xl"
          style={{ left: `${o.x}%`, top: `${o.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          📚
        </div>
      ))}

      {/* Player */}
      <PixelCharacter
        type="snehan"
        className="absolute w-7 h-8 sm:w-8 sm:h-9 z-10"
        style={{ left: `${playerPos.x}%`, top: `${playerPos.y}%`, transform: 'translate(-50%, -50%)' }}
      />

      {/* Hearts floating */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-3 h-3 text-pink-400/40 animate-pulse"
          style={{ left: `${10 + i * 15}%`, top: `${55 + (i % 3) * 12}%`, animationDelay: `${i * 0.2}s` }}
        >
          <PixelHeart />
        </div>
      ))}

      {/* Subtle snow/petals falling */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`snow-${i}`}
          className="absolute w-1 h-1 bg-white/30 rounded-full animate-bounce"
          style={{
            left: `${10 + i * 12}%`,
            top: `${10 + (i % 4) * 20}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: '2s'
          }}
        />
      ))}
    </div>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================

// --- STORY INTRO SCREENS ---

const StoryIntro = ({ onComplete }) => {
  const [page, setPage] = useState(0);

  const pages = [
    {
      title: "A LOVE STORY",
      text: "Ten years ago, two hearts found each other on a summer program called DukeEngage...",
      emoji: "💕",
      bg: "from-rose-400 to-pink-500",
    },
    {
      title: "SNEHAN & ANAHOTTA",
      text: "From the moment they met, they knew this was something special. A connection that would span continents and years.",
      emoji: "✨",
      bg: "from-purple-400 to-pink-500",
    },
    {
      title: "THROUGH IT ALL",
      text: "Distance could never keep them apart. Snehan would cross oceans, brave winters, and move mountains just to be with her.",
      emoji: "🌍",
      bg: "from-blue-400 to-purple-500",
    },
    {
      title: "ONE TRUE LOVE",
      text: "A decade of adventures, laughter, and love. From Durham to Durham, across cities and countries...",
      emoji: "💑",
      bg: "from-pink-400 to-rose-500",
    },
    {
      title: "DUKEENGAGED",
      text: "They met on DukeEngage. Now, after 10 beautiful years... it's time to become DukeENGAGED.",
      emoji: "💍",
      bg: "from-amber-400 to-rose-500",
    },
  ];

  const currentPage = pages[page];
  const isLastPage = page === pages.length - 1;

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-b ${currentPage.bg} p-4 relative overflow-hidden`}>
      {/* Floating hearts background */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 text-white/20 animate-pulse"
          style={{
            left: `${10 + i * 15}%`,
            top: `${15 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.3}s`
          }}
        >
          <PixelHeart />
        </div>
      ))}

      {/* Page indicator */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1">
        {pages.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${i === page ? 'bg-white' : 'bg-white/30'}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="text-4xl mb-3 animate-bounce">{currentPage.emoji}</div>
      <div className="text-white text-xs sm:text-sm mb-3 drop-shadow-lg text-center font-pixel">
        {currentPage.title}
      </div>
      <div className="text-white/90 text-[7px] sm:text-[8px] leading-relaxed text-center max-w-[240px] mb-6 font-pixel">
        {currentPage.text}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        {page > 0 && (
          <Button onClick={() => setPage(p => p - 1)} color="gray">
            ← BACK
          </Button>
        )}
        <Button
          onClick={() => isLastPage ? onComplete() : setPage(p => p + 1)}
          color={isLastPage ? "pink" : "green"}
        >
          {isLastPage ? "BEGIN QUEST 💕" : "NEXT →"}
        </Button>
      </div>

      {/* Skip option */}
      {!isLastPage && (
        <button
          onClick={onComplete}
          className="absolute bottom-3 right-3 text-white/40 text-[6px] font-pixel hover:text-white/70 transition-colors"
        >
          SKIP →
        </button>
      )}
    </div>
  );
};

// --- PASSWORD SCREEN ---

const PasswordScreen = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const correctPassword = 'iluvu';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password.toLowerCase() === correctPassword) {
      onSuccess();
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 1000);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-pink-400 to-rose-500 p-4">
      <div className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-pulse mb-3"><PixelHeart /></div>
      <div className="text-white text-sm sm:text-lg mb-1 drop-shadow-lg">LOVE QUEST</div>
      <div className="text-white/60 text-[6px] sm:text-[7px] mb-4">Enter the secret password</div>
      
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3">
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password..."
          autoComplete="off"
          autoCapitalize="off"
          className={`
            px-4 py-2 font-pixel text-[10px] sm:text-xs text-center
            bg-white/90 border-4 rounded
            outline-none w-36 sm:w-44
            ${error ? 'border-red-500 bg-red-100 animate-pulse' : 'border-pink-300 focus:border-pink-500'}
          `}
        />
        <Button type="submit" color="pink">UNLOCK 💕</Button>
      </form>
      
      {error && (
        <div className="text-red-200 text-[7px] mt-2 font-pixel animate-pulse">
          Wrong password!
        </div>
      )}
      
      <div className="text-white/30 text-[5px] mt-6">By Snehan Games</div>
    </div>
  );
};

// ============================================================================
// MAIN APP
// ============================================================================

export default function App() {
  const [gameState, setGameState] = useState('PASSWORD'); // PASSWORD, START, STORY, LEVEL_INTRO, PLAYING, REUNION, VICTORY
  const [currentLevel, setCurrentLevel] = useState(1);

  const keysRef = useRef(new Set());
  const actionRef = useRef(null);

  // Load font
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const keyMap = {
      ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right',
      w: 'up', s: 'down', a: 'left', d: 'right', W: 'up', S: 'down', A: 'left', D: 'right',
    };
    const onDown = (e) => {
      const dir = keyMap[e.key];
      if (dir) { e.preventDefault(); keysRef.current.add(dir); }
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); actionRef.current?.(); }
    };
    const onUp = (e) => {
      const dir = keyMap[e.key];
      if (dir) keysRef.current.delete(dir);
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp); };
  }, []);

  const handleLevelWin = useCallback(() => {
    setGameState('REUNION');
  }, []);

  const handleContinue = useCallback(() => {
    if (currentLevel >= 7) {
      setGameState('VICTORY');
    } else {
      setCurrentLevel(l => l + 1);
      setGameState('LEVEL_INTRO');
    }
  }, [currentLevel]);

  const handleRestart = useCallback(() => {
    setCurrentLevel(1);
    setGameState('START');
  }, []);

  const startLevel = useCallback(() => {
    keysRef.current.clear();
    setGameState('PLAYING');
  }, []);

  const levelData = LEVELS[currentLevel - 1];
  const isPlaying = gameState === 'PLAYING';

  const renderLevel = () => {
    const props = { onWin: handleLevelWin, keysRef, actionRef };
    switch (currentLevel) {
      case 1: return <Level1_PrisonBreak {...props} />;
      case 2: return <Level2_DukeGraduation {...props} />;
      case 3: return <Level3_MetroEscape {...props} />;
      case 4: return <Level4_TorontoWinter {...props} />;
      case 5: return <Level5_PittsburghBridges {...props} />;
      case 6: return <Level6_MorgantownBike {...props} />;
      case 7: return <Level7_LebanonProposal {...props} />;
      default: return null;
    }
  };

  return (
    <div
      className="min-h-screen min-h-[100dvh] bg-gradient-to-b from-pink-200 to-pink-300 flex flex-row items-center justify-center px-3 py-4 gap-4 sm:gap-6 font-pixel select-none overflow-hidden"
      style={{ touchAction: 'none' }}
    >
      <style>{`
        .font-pixel { font-family: 'Press Start 2P', cursive; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-float { animation: float 2s ease-in-out infinite; }
      `}</style>

      {/* === D-PAD (LEFT SIDE) === */}
      <div className={`flex-shrink-0 transition-opacity ${!isPlaying ? 'opacity-30 pointer-events-none' : ''}`}>
        <DPad keysRef={keysRef} />
      </div>

      {/* === GAME CONTAINER (CENTER) === */}
      <div className="flex-shrink-0 bg-neutral-200 rounded-2xl p-2 shadow-2xl border-b-4 border-r-4 border-neutral-300">
        <div className="bg-neutral-800 rounded-xl p-2 flex flex-col">

          {/* Power LED + Level indicator */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full transition-colors ${isPlaying ? 'bg-green-400 shadow-[0_0_6px_#4ade80]' : 'bg-red-900'}`} />
              <span className="text-neutral-500 text-[6px] font-sans uppercase">Power</span>
            </div>
            {gameState !== 'START' && gameState !== 'VICTORY' && (
              <span className="text-neutral-400 text-[6px] font-pixel">
                LVL {currentLevel}/7
              </span>
            )}
          </div>

          {/* ====== SCREEN ====== */}
          <div className="w-[280px] h-[210px] sm:w-[320px] sm:h-[240px] rounded shadow-inner overflow-hidden relative border-2 border-neutral-700/50 bg-[#E0F8CF]">
            <ScanlineOverlay />

            {/* --- PASSWORD SCREEN --- */}
            {gameState === 'PASSWORD' && (
              <PasswordScreen onSuccess={() => setGameState('START')} />
            )}

            {/* --- START SCREEN --- */}
            {gameState === 'START' && (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-pink-400 to-rose-500 p-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 text-white animate-pulse mb-2"><PixelHeart /></div>
                <div className="text-white text-lg sm:text-2xl mb-1 drop-shadow-lg">LOVE QUEST</div>
                <div className="text-white/70 text-[6px] sm:text-[7px] mb-1">A Journey of Love</div>
                <div className="text-white/50 text-[5px] sm:text-[6px] mb-4">Durham UK → Lebanon NH</div>
                <Button onClick={() => setGameState('STORY')} color="pink">START</Button>
                <div className="text-white/40 text-[5px] mt-4">By Snehan Games</div>
              </div>
            )}

            {/* --- STORY INTRO --- */}
            {gameState === 'STORY' && (
              <StoryIntro onComplete={() => setGameState('LEVEL_INTRO')} />
            )}

            {/* --- LEVEL INTRO --- */}
            {gameState === 'LEVEL_INTRO' && (
              <div className="w-full h-full flex flex-col items-center justify-center p-4" style={{ backgroundColor: levelData.color }}>
                <div className="text-white/60 text-[7px] sm:text-[8px] mb-1">LEVEL {currentLevel}</div>
                <div className="text-white text-sm sm:text-lg mb-1 drop-shadow">{levelData.city}, {levelData.country}</div>
                <div className="text-white/80 text-[7px] sm:text-[8px] mb-4">{levelData.subtitle}</div>
                <div className="flex gap-2 mb-4">
                  <PixelCharacter type="snehan" className="w-8 h-10 sm:w-10 sm:h-12" />
                </div>
                <Button onClick={startLevel} color="green">GO!</Button>
              </div>
            )}

            {/* --- PLAYING --- */}
            {gameState === 'PLAYING' && renderLevel()}

            {/* --- REUNION --- */}
            {gameState === 'REUNION' && (
              <ReunionScreen level={currentLevel} onContinue={handleContinue} />
            )}

            {/* --- VICTORY --- */}
            {gameState === 'VICTORY' && (
              <VictoryScreen onRestart={handleRestart} />
            )}
          </div>

          {/* Brand */}
          <div className="text-right pr-2 py-1 text-neutral-600 font-bold italic font-sans text-sm tracking-tighter">
            SneBoy<span className="text-pink-500 text-[7px] not-italic ml-0.5 font-pixel">COLOR</span>
          </div>
        </div>
      </div>

      {/* === ACTION BUTTON (RIGHT SIDE) === */}
      <div className={`flex-shrink-0 transition-opacity ${!isPlaying ? 'opacity-30 pointer-events-none' : ''}`}>
        <ActionButton
          label="A"
          onAction={() => actionRef.current?.()}
          color="rose"
          subLabel="Action"
        />
      </div>
    </div>
  );
}
