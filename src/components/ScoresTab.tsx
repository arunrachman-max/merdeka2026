import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Share2, RefreshCw } from 'lucide-react';

interface LombaIdea {
  title: string;
  category: 'anak-anak' | 'remaja';
  targetAge: string;
  description: string;
  togethernessValue: string;
  setupComplexity: 'Mudah' | 'Sedang' | 'Sulit';
  iconName: string;
  imageKeyword: string;
  howToPlay: string[];
  equipmentNeeded: string[];
  teamSizeRange: string;
  pahlawanHighlight?: string;
}

interface Team {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
}

interface ScoresTabProps {
  ideas: LombaIdea[];
  TEAMS: Team[];
  gameScores: Record<string, Record<string, number>>;
  updatePoints: (gameTitle: string, teamId: string, amount: number) => void;
  setGameScores: React.Dispatch<React.SetStateAction<Record<string, Record<string, number>>>>;
  INITIAL_SCORES: Record<string, Record<string, number>>;
  handleCopyScoresToClipboard: () => void;
}

export const ScoresTabComponent: React.FC<ScoresTabProps> = ({
  ideas,
  TEAMS,
  gameScores,
  updatePoints,
  setGameScores,
  INITIAL_SCORES,
  handleCopyScoresToClipboard
}) => {
  // Pre-calculate typed score totals cleanly with correct number casts
  const sortedTeamTotals = TEAMS.map(team => {
    const total = Object.values(gameScores).reduce((sum: number, gameRow: Record<string, number>) => sum + (gameRow[team.id] || 0), 0);
    return { ...team, total };
  }).sort((a, b) => (b.total as number) - (a.total as number));

  const maxTotal = Math.max(...sortedTeamTotals.map(t => t.total), 100);

  const firstTeam = sortedTeamTotals[0] || { id: 'merdeka', name: 'Tim Merdeka', icon: '🔴', total: 0 };
  const secondTeam = sortedTeamTotals[1] || { id: 'garuda', name: 'Tim Garuda', icon: '🟡', total: 0 };
  const thirdTeam = sortedTeamTotals[2] || { id: 'nusantara', name: 'Tim Nusantara', icon: '🟢', total: 0 };

  return (
    <div className="space-y-10">
      {/* Leaderboard Header */}
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-red-100 shadow-xl shadow-red-100/30 text-center relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-yellow-50 rounded-full blur-2xl"></div>
        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <div className="inline-flex p-4 bg-yellow-105 text-yellow-650 rounded-2xl">
            <Trophy className="w-8 h-8 animate-pulse text-yellow-550" />
          </div>
          <h2 className="text-4xl font-display font-black text-gray-900 tracking-tight">Klasemen & Poin Sinergi Lomba</h2>
          <p className="text-gray-500 font-medium font-sans">
            Pantau akumulasi skor perjuangan gotong royong seluruh tim. Sesuaikan perolehan poin setiap perlombaan di bawah ini untuk melihat siapa tim terkuat!
          </p>
          
          {/* Share and Reset Leaderboard Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleCopyScoresToClipboard}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-black text-xs md:text-sm px-5 py-3 rounded-xl shadow-md transition-all hover:-translate-y-0.5"
            >
              <Share2 className="w-4 h-4" />
              Bagikan Hasil Klasemen
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Apakah Anda yakin ingin menyetel ulang seluruh skor tim ke nilai awal bawaan?")) {
                  setGameScores(INITIAL_SCORES);
                  localStorage.setItem('sinergi_merdeka_scores_v2', JSON.stringify(INITIAL_SCORES));
                }
              }}
              className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-650 font-bold text-xs md:text-sm px-5 py-3 rounded-xl transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Reset Semua Poin
            </button>
          </div>
        </div>
      </div>

      {/* Accumulative standings row & Podium */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        
        {/* Visual Podium Graphic (Left/Middle Column) */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-150 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="text-left font-sans">
                <h3 className="text-lg font-display font-black text-gray-900">Podium Kemenangan Sementara</h3>
                <p className="text-xs text-gray-400 font-bold">Tim juara yang memimpin orkestrasi nilai luhur</p>
              </div>
              <span className="text-[10px] bg-yellow-50 text-yellow-705 px-3 py-1 rounded-full font-black border border-yellow-200 uppercase tracking-wider">
                Live Podium
              </span>
            </div>

            {/* 3D-Like Pure CSS Podium blocks */}
            <div className="flex items-end justify-center pt-8 pb-4 gap-2 sm:gap-4 h-56">
              
              {/* 2nd Place */}
              <div className="flex flex-col items-center w-24 sm:w-28 text-center flex-1">
                <span className="text-3xl mb-1">🥈</span>
                <span className="text-[11px] font-black leading-tight text-gray-750 truncate max-w-full font-sans">
                  {secondTeam.name.split(' ')[1] || secondTeam.name}
                </span>
                <span className="text-[10px] font-mono font-black text-gray-400 mb-2">
                  {secondTeam.total} Pts
                </span>
                <div className="w-full bg-stone-100 border-t border-stone-300 rounded-t-xl h-24 flex items-center justify-center font-display font-black text-2xl text-stone-500 shadow-inner">
                  2
                </div>
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center w-24 sm:w-32 text-center flex-1">
                <span className="text-4xl mb-1 animate-bounce">👑</span>
                <span className="text-xs font-black leading-tight text-red-650 truncate max-w-full font-sans">
                  {firstTeam.name.split(' ')[1] || firstTeam.name}
                </span>
                <span className="text-xs font-mono font-black text-stone-905 mb-2">
                  {firstTeam.total} Pts
                </span>
                <div className="w-full bg-yellow-400 border-t-2 border-yellow-500 rounded-t-xl h-32 flex items-center justify-center font-display font-black text-3xl text-stone-900 shadow-md relative">
                  1
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/30 blur-md"></div>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center w-24 sm:w-28 text-center flex-1">
                <span className="text-3xl mb-1">🥉</span>
                <span className="text-[11px] font-black leading-tight text-gray-750 truncate max-w-full font-sans">
                  {thirdTeam.name.split(' ')[1] || thirdTeam.name}
                </span>
                <span className="text-[10px] font-mono font-black text-gray-404 mb-2">
                  {thirdTeam.total} Pts
                </span>
                <div className="w-full bg-amber-50 border-t border-amber-200 rounded-t-xl h-16 flex items-center justify-center font-display font-black text-xl text-amber-800 shadow-inner">
                  3
                </div>
              </div>

            </div>
          </div>

          <div className="bg-yellow-50/70 p-4 rounded-2xl border border-yellow-101 flex items-start gap-3 mt-3">
            <span className="text-xl">💡</span>
            <div className="text-left font-sans">
              <p className="text-xs font-black text-yellow-905 font-display">Perhatikan Selisih Skor!</p>
              <p className="text-[11px] text-gray-650 leading-relaxed font-semibold">
                Setiap tim mengumpulkan poin lebih banyak dengan menjuarai kuis edukasi & tantangan fisik. Gotong royong dan ketangkasan adalah kunci mutlak kedaulatan tim agustusan.
              </p>
            </div>
          </div>
        </div>

        {/* Score Summary List View (Right Column) */}
        <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-150 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-left font-sans font-display">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-gray-400 block mb-0.5 animate-pulse">Klasemen Akumulatif</span>
              <h3 className="text-lg font-black text-stone-900">Total Poin Sinergi</h3>
            </div>

            <div className="space-y-4">
              {sortedTeamTotals.map((team, idx) => {
                const progressPercent = (team.total / maxTotal) * 100;
                return (
                  <div key={team.id} className="space-y-1 text-left font-sans">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-stone-955 flex items-center gap-1.5 font-sans">
                        <span className="text-[10px] w-5 h-5 flex items-center justify-center bg-gray-100 text-gray-700 font-extrabold rounded-full">
                          {idx + 1}
                        </span>
                        {team.icon} {team.name}
                      </span>
                      <span className="text-xs font-mono font-black text-red-650">{team.total} Pts</span>
                    </div>
                    
                    {/* Custom animated-like styled bar indicator */}
                    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          team.id === 'merdeka' ? 'bg-red-650' :
                          team.id === 'garuda' ? 'bg-yellow-400' :
                          team.id === 'nusantara' ? 'bg-green-650' : 'bg-blue-650'
                        }`}
                        style={{ width: `${Math.max(10, progressPercent)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Highlighting who is collecting more points */}
          <div className="bg-red-50/50 border border-red-105 p-4 rounded-2xl text-left mt-6 font-sans">
            <span className="text-[9px] uppercase tracking-widest font-extrabold text-red-600 block mb-1">
              🏆 Pemenang Saat Ini
            </span>
            <p className="text-xs font-bold text-stone-900 leading-normal">
              Tim terunggul di wilayah RW 08 adalah{' '}
              <span className="text-red-650 font-black font-sans">
                {firstTeam.name}
              </span>{' '}
              dengan total perolehan{' '}
              <span className="font-mono font-black text-red-650 underline">
                {firstTeam.total}
              </span>{' '}
              poin! Sengkuyung gotong royong terbukti mengukir prestasi gemilang! 💪
            </p>
          </div>
        </div>
      </div>

      {/* Point management per individual competition catalog */}
      <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-150 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
          <div>
            <h3 className="text-lg font-display font-black text-stone-900 font-sans">Perincian & Edit Poin Berdasarkan Lomba</h3>
            <p className="text-xs text-gray-400 font-bold font-sans">Sesuaikan atau tambahkan poin tim di setiap bidang lomba</p>
          </div>
        </div>

        {/* Competition scoring editor grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ideas.map((game) => {
            return (
              <div key={game.title} className="bg-[#faf8f5] p-5 rounded-2xl border border-gray-200/60 text-left space-y-4 font-sans font-sans">
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                      game.category === 'anak-anak' ? 'bg-yellow-105 text-yellow-850 border border-yellow-200/40' : 'bg-blue-105 text-blue-850 border border-blue-200/40'
                    }`}>
                      {game.category === 'anak-anak' ? 'Anak' : 'Remaja'}
                    </span>
                    <h4 className="text-sm font-black text-gray-900 mt-1.5 line-clamp-1">{game.title}</h4>
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 shrink-0">{game.teamSizeRange}</span>
                </div>

                {/* Standings layout inside a specific game */}
                <div className="space-y-2">
                  {TEAMS.map((team) => {
                    const score = (gameScores[game.title] || {})[team.id] || 0;
                    return (
                      <div key={team.id} className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-gray-150">
                        <span className="text-xs font-bold text-stone-850 flex items-center gap-1.5 font-sans">
                          <span>{team.icon}</span>
                          {team.name.split(' ')[1]}
                        </span>
                        
                        <div className="flex items-center gap-2">
                          {/* Point score badge */}
                          <span className="font-mono text-xs font-black text-stone-900 w-12 text-center bg-gray-50 py-1 rounded-md border border-gray-200">
                            {score}
                          </span>

                          {/* Update actions */}
                          <div className="flex p-0.5 bg-gray-100 rounded-lg">
                            <button
                              type="button"
                              onClick={() => updatePoints(game.title, team.id, -5)}
                              className="w-6 h-6 flex items-center justify-center text-[10px] font-extrabold text-gray-500 hover:bg-white rounded transition-colors"
                              title="Kurangi 5 poin"
                            >
                              -
                            </button>
                            <button
                              type="button"
                              onClick={() => updatePoints(game.title, team.id, 5)}
                              className="w-6 h-6 flex items-center justify-center text-[9px] font-extrabold text-red-650 hover:bg-white rounded transition-colors"
                              title="Tambah 5 poin"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
