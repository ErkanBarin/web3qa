'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Script from 'next/script';

// ============================================================================
// Styles - matching the original advisor dashboard exactly
// ============================================================================
const styles = `
  :root {
    --bg-primary: #0d1117;
    --bg-secondary: #161b22;
    --bg-tertiary: #21262d;
    --text-primary: #f0f6fc;
    --text-secondary: #8b949e;
    --accent-green: #238636;
    --accent-red: #da3633;
    --accent-blue: #58a6ff;
    --accent-yellow: #d29922;
    --border-color: #30363d;
  }

  .advisor-page {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    background: var(--bg-primary);
    color: var(--text-primary);
    min-height: 100vh;
  }

  .advisor-header {
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .advisor-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .advisor-controls {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  .advisor-controls select, .advisor-controls button {
    background: var(--bg-tertiary);
    color: var(--text-primary);
    border: 1px solid var(--border-color);
    padding: 0.5rem 1rem;
    border-radius: 6px;
    font-size: 0.9rem;
    cursor: pointer;
  }

  .advisor-controls button {
    background: var(--accent-blue);
    border-color: var(--accent-blue);
    font-weight: 500;
  }

  .advisor-controls button:disabled {
    opacity: 0.5;
  }

  .advisor-main {
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 1.5rem;
    padding: 1.5rem 2rem;
    max-width: 1800px;
    margin: 0 auto;
  }

  @media (max-width: 1200px) {
    .advisor-main { grid-template-columns: 1fr; }
  }

  .card {
    background: var(--bg-secondary);
    border-radius: 12px;
    border: 1px solid var(--border-color);
    overflow: hidden;
  }

  .section-header {
    padding: 1rem 1.25rem;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .section-title {
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .chart-container { height: 400px; }

  .sidebar { display: flex; flex-direction: column; gap: 1.5rem; }

  .indicators-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.75rem;
    padding: 1rem;
  }

  .indicator-item {
    background: var(--bg-tertiary);
    padding: 0.75rem;
    border-radius: 8px;
    text-align: center;
  }

  .indicator-label {
    font-size: 0.65rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    margin-bottom: 0.25rem;
  }

  .indicator-value { font-size: 0.95rem; font-weight: 600; }
  .indicator-value.bullish { color: #3fb950; }
  .indicator-value.bearish { color: #f85149; }
  .indicator-value.neutral { color: var(--text-secondary); }

  .advice-card { padding: 1.25rem; }

  .advice-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
  }

  .symbol-badge { font-size: 1.5rem; font-weight: 700; }

  .timeframe-badge {
    background: var(--bg-tertiary);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    color: var(--text-secondary);
  }

  .bias-badge {
    padding: 0.35rem 0.75rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
  }

  .bias-bullish { background: rgba(35, 134, 54, 0.2); color: #3fb950; }
  .bias-bearish { background: rgba(218, 54, 51, 0.2); color: #f85149; }
  .bias-neutral { background: rgba(210, 153, 34, 0.2); color: #d29922; }

  .score-row { display: flex; gap: 1rem; margin-bottom: 1rem; }

  .score-item {
    flex: 1;
    background: var(--bg-tertiary);
    padding: 0.75rem;
    border-radius: 8px;
    text-align: center;
  }

  .score-label {
    font-size: 0.7rem;
    color: var(--text-secondary);
    text-transform: uppercase;
    margin-bottom: 0.25rem;
  }

  .score-value { font-size: 1.25rem; font-weight: 700; }

  .action-badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: var(--bg-tertiary);
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .rationale-list { list-style: none; font-size: 0.85rem; line-height: 1.6; }

  .rationale-list li {
    padding: 0.35rem 0;
    padding-left: 1.25rem;
    position: relative;
    color: var(--text-secondary);
  }

  .rationale-list li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: var(--accent-blue);
  }

  .risk-section {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
  }

  .risk-title {
    font-size: 0.8rem;
    color: var(--accent-yellow);
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .risk-list li { padding: 0.25rem 0; color: var(--text-secondary); font-size: 0.8rem; }

  .fear-greed-section { padding: 1rem; }

  .gauge-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 120px;
  }

  .gauge-value { font-size: 2.5rem; font-weight: 700; }
  .gauge-label { font-size: 0.9rem; color: var(--text-secondary); text-transform: uppercase; margin-top: 0.5rem; }

  .fear-greed-bar {
    width: 100%;
    height: 8px;
    background: linear-gradient(to right, #da3633, #d29922, #238636);
    border-radius: 4px;
    margin-top: 1rem;
    position: relative;
  }

  .fear-greed-marker {
    position: absolute;
    top: -4px;
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    transform: translateX(-50%);
    box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  .key-levels { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; padding: 1rem; }
  .levels-column h4 { font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 0.5rem; text-transform: uppercase; }
  .level-item { font-size: 0.9rem; padding: 0.25rem 0; font-family: monospace; }
  .level-support { color: #3fb950; }
  .level-resistance { color: #f85149; }

  .next-zone-hint {
    font-size: 0.75rem;
    color: var(--text-secondary);
    margin-top: 0.75rem;
    padding-top: 0.5rem;
    border-top: 1px solid var(--border-color);
    grid-column: 1 / -1;
  }

  .outlook-section { padding: 1rem; }

  .outlook-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-color);
  }

  .outlook-row:last-child { border-bottom: none; }
  .outlook-label { font-weight: 500; color: var(--text-secondary); font-size: 0.85rem; min-width: 70px; }
  .outlook-value { color: var(--text-primary); font-size: 0.85rem; text-align: right; flex: 1; }

  .llm-insight-section { padding: 1rem; }

  .insight-conviction-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem;
    background: var(--bg-tertiary);
    border-radius: 6px;
    margin-bottom: 1rem;
  }

  .conviction-badge {
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .conviction-up { background: rgba(63, 185, 80, 0.2); color: #3fb950; }
  .conviction-down { background: rgba(248, 81, 73, 0.2); color: #f85149; }
  .conviction-sideways { background: rgba(210, 153, 34, 0.2); color: #d29922; }

  .insight-section-title {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--text-secondary);
    margin-bottom: 0.5rem;
    margin-top: 0.75rem;
  }

  .insight-rationale { font-size: 0.85rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 1rem; }
  .insight-features-list { list-style: disc; padding-left: 1.25rem; font-size: 0.8rem; color: var(--text-secondary); }
  .insight-features-list li { padding: 0.15rem 0; }

  .insight-news-item {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-color);
  }

  .insight-news-item:last-child { border-bottom: none; }

  .insight-news-title {
    font-size: 0.8rem;
    color: var(--text-primary);
    text-decoration: none;
  }

  .insight-news-title:hover { text-decoration: underline; }

  .insight-news-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem;
    color: var(--text-secondary);
    margin-top: 0.25rem;
  }

  .insight-news-sentiment.bullish { color: #3fb950; }
  .insight-news-sentiment.bearish { color: #f85149; }

  .tf-comparison { padding: 1rem; }

  .tf-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5rem;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-color);
  }

  .tf-row:last-child { border-bottom: none; }
  .tf-header { font-weight: 600; color: var(--text-secondary); font-size: 0.75rem; text-transform: uppercase; }
  .tf-label { font-size: 0.8rem; color: var(--text-secondary); }
  .tf-value { font-size: 0.85rem; font-weight: 500; text-align: center; }
  .tf-value.bullish { color: #3fb950; }
  .tf-value.bearish { color: #f85149; }

  .cards-grid-3 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  .disclaimer {
    background: rgba(210, 153, 34, 0.1);
    border: 1px solid rgba(210, 153, 34, 0.3);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    font-size: 0.75rem;
    color: var(--accent-yellow);
  }

  .quality-high { color: #3fb950; }
  .quality-medium { color: #d29922; }
  .quality-low { color: #f85149; }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid var(--border-color);
    border-top-color: var(--accent-blue);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .loading { display: flex; align-items: center; justify-content: center; height: 200px; }

  .login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--bg-primary);
  }

  .login-form {
    background: var(--bg-secondary);
    padding: 2rem;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    width: 100%;
    max-width: 400px;
  }

  .login-form input {
    width: 100%;
    padding: 0.75rem 1rem;
    background: var(--bg-tertiary);
    border: 1px solid var(--border-color);
    border-radius: 6px;
    color: var(--text-primary);
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .login-form button {
    width: 100%;
    padding: 0.75rem 1rem;
    background: var(--accent-blue);
    border: none;
    border-radius: 6px;
    color: #fff;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
  }

  .error-text { color: #f85149; margin-bottom: 1rem; font-size: 0.9rem; }
`;

// ============================================================================
// Login Component
// ============================================================================
function LoginForm({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/trading/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) onLogin();
      else setError(data.error || 'Invalid password');
    } catch {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '3rem' }}>📊</div>
          <h1 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>Crypto Advisor</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Enter password to access</p>
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {error && <div className="error-text">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Checking...' : 'Access Dashboard'}
        </button>
      </form>
    </div>
  );
}

// ============================================================================
// Main Dashboard - mirrors the original index.html exactly
// ============================================================================
function Dashboard({ onLogout }) {
  const [symbol, setSymbol] = useState('BTC');
  const [profile, setProfile] = useState('swing');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/trading/advisor?symbol=${symbol}&profile=${profile}`);
      const json = await res.json();
      if (!json.error) setData(json);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }, [symbol, profile]);

  useEffect(() => { loadData(); }, [loadData]);

  // Chart initialization - with better error handling and stability
  const [chartReady, setChartReady] = useState(false);
  
  useEffect(() => {
    if (!data?.candles || !data.candles.length || typeof window === 'undefined') return;
    
    // Small delay to ensure container is rendered
    const timer = setTimeout(() => {
      import('lightweight-charts').then((LWC) => {
        if (!chartContainerRef.current) return;
        
        // Clean up existing chart
        if (chartRef.current) {
          try { chartRef.current.remove(); } catch(e) {}
          chartRef.current = null;
        }

        try {
          const container = chartContainerRef.current;
          const width = container.clientWidth || 800;
          
          const chart = LWC.createChart(container, {
            layout: { background: { type: 'solid', color: '#161b22' }, textColor: '#8b949e' },
            grid: { vertLines: { color: '#21262d' }, horzLines: { color: '#21262d' } },
            rightPriceScale: { borderColor: '#30363d' },
            timeScale: { borderColor: '#30363d', timeVisible: true },
            width: width,
            height: 400,
          });

          const series = chart.addSeries(LWC.CandlestickSeries, {
            upColor: '#238636', downColor: '#da3633',
            borderUpColor: '#238636', borderDownColor: '#da3633',
            wickUpColor: '#238636', wickDownColor: '#da3633',
          });

          const chartData = data.candles.map(c => ({
            time: c.time.split('T')[0],
            open: c.open, high: c.high, low: c.low, close: c.close,
          }));
          
          series.setData(chartData);
          chart.timeScale().fitContent();
          chartRef.current = chart;
          setChartReady(true);
        } catch (err) {
          console.error('Chart init error:', err);
        }
      }).catch(err => console.error('Failed to load chart library:', err));
    }, 100);

    return () => {
      clearTimeout(timer);
      if (chartRef.current) {
        try { chartRef.current.remove(); } catch(e) {}
        chartRef.current = null;
      }
    };
  }, [data?.candles]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current && chartContainerRef.current) {
        chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    await fetch('/api/trading/auth', { method: 'DELETE' });
    onLogout();
  };

  // Helper functions
  const getClass = (value) => {
    if (!value) return 'neutral';
    const v = String(value).toLowerCase();
    if (v.includes('bull') || v === 'up' || v === 'oversold' || v.includes('above')) return 'bullish';
    if (v.includes('bear') || v === 'down' || v === 'overbought' || v.includes('below')) return 'bearish';
    return 'neutral';
  };

  const getQualityClass = (v) => v >= 60 ? 'quality-high' : v >= 40 ? 'quality-medium' : 'quality-low';

  const formatPrice = (p) => p ? `$${p.toLocaleString()}` : 'N/A';

  const feature4h = data?.features?.find(f => f.timeframe === '4h');
  const feature1d = data?.features?.find(f => f.timeframe === '1d');
  const advice4h = data?.advice?.find(a => a.timeframe === '4h');
  const advice1d = data?.advice?.find(a => a.timeframe === '1d');
  const fearGreed = data?.fearGreed || [{ value: 50 }];
  const fgValue = Array.isArray(fearGreed) ? fearGreed[fearGreed.length - 1]?.value : fearGreed.value;
  const fgLabel = fgValue < 25 ? 'Extreme Fear' : fgValue < 45 ? 'Fear' : fgValue < 55 ? 'Neutral' : fgValue < 75 ? 'Greed' : 'Extreme Greed';
  const fgColor = fgValue < 25 ? '#da3633' : fgValue < 45 ? '#f85149' : fgValue < 55 ? '#d29922' : fgValue < 75 ? '#3fb950' : '#238636';

  const currentPrice = data?.candles?.[data.candles.length - 1]?.close;
  const prevPrice = data?.candles?.[data.candles.length - 2]?.close;
  const priceChange = currentPrice && prevPrice ? ((currentPrice - prevPrice) / prevPrice * 100) : 0;

  // LLM insight from advice
  const llmInsight = advice4h?.llmInsight || advice1d?.llmInsight;
  const outlook = data?.outlook || llmInsight?.outlooks?.[symbol];

  return (
    <div className="advisor-page">
      <style>{styles}</style>

      <header className="advisor-header">
        <div className="advisor-logo">
          <span>📊</span>
          <span>Crypto Advisor</span>
        </div>
        <div className="advisor-controls">
          <select value={symbol} onChange={(e) => setSymbol(e.target.value)}>
            <option value="BTC">BTC - Bitcoin</option>
            <option value="ETH">ETH - Ethereum</option>
            <option value="XRP">XRP - Ripple</option>
            <option value="SOL">SOL - Solana</option>
            <option value="ADA">ADA - Cardano</option>
            <option value="AVAX">AVAX - Avalanche</option>
            <option value="SUI">SUI - Sui</option>
            <option value="XLM">XLM - Stellar</option>
          </select>
          <select value={profile} onChange={(e) => setProfile(e.target.value)}>
            <option value="intraday">Intraday</option>
            <option value="swing">Swing</option>
            <option value="position">Position</option>
          </select>
          <button onClick={loadData} disabled={loading}>
            {loading ? '⏳ Loading...' : '🔄 Refresh'}
          </button>
          <button onClick={handleLogout} style={{ background: '#30363d' }}>Logout</button>
        </div>
      </header>

      <main className="advisor-main">
        <div className="left-section">
          {/* Price Chart */}
          <div className="card">
            <div className="section-header">
              <span className="section-title">📈 Price Chart (1D)</span>
              <span className="timeframe-badge">
                {currentPrice ? `${formatPrice(currentPrice)} (${priceChange >= 0 ? '+' : ''}${priceChange.toFixed(2)}%)` : 'Loading...'}
              </span>
            </div>
            <div ref={chartContainerRef} className="chart-container" style={{ minHeight: '400px', position: 'relative' }}>
              {(loading || (!chartReady && data?.candles)) && (
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#8b949e' }}>
                  Loading chart...
                </div>
              )}
            </div>
          </div>

          {/* Technical Indicators */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div className="card">
              <div className="section-header">
                <span className="section-title">🎯 Technical Indicators (4H)</span>
              </div>
              <div className="indicators-grid">
                {renderIndicators(feature4h)}
              </div>
            </div>
            <div className="card">
              <div className="section-header">
                <span className="section-title">🎯 Technical Indicators (1D)</span>
              </div>
              <div className="indicators-grid">
                {renderIndicators(feature1d)}
              </div>
            </div>
          </div>

          {/* Three Column Grid */}
          <div className="cards-grid-3">
            {/* Key Levels */}
            <div className="card">
              <div className="section-header">
                <span className="section-title">📍 Key Levels</span>
              </div>
              <div className="key-levels">
                <div className="levels-column">
                  <h4>🟢 Support</h4>
                  {(advice4h?.keyLevels?.supports || []).slice(0, 3).map((s, i) => (
                    <div key={i} className="level-item level-support">{formatPrice(s)}</div>
                  ))}
                </div>
                <div className="levels-column">
                  <h4>🔴 Resistance</h4>
                  {(advice4h?.keyLevels?.resistances || []).slice(0, 3).map((r, i) => (
                    <div key={i} className="level-item level-resistance">{formatPrice(r)}</div>
                  ))}
                </div>
                {advice4h?.keyLevelsSummary && (
                  <div className="next-zone-hint">
                    {advice4h.keyLevelsSummary.support?.nextZone && (
                      <div>If support fails → <span className="level-support">{formatPrice(advice4h.keyLevelsSummary.support.nextZone.center)}</span></div>
                    )}
                    {advice4h.keyLevelsSummary.resistance?.nextZone && (
                      <div>If resistance breaks → <span className="level-resistance">{formatPrice(advice4h.keyLevelsSummary.resistance.nextZone.center)}</span></div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Timeframe Comparison */}
            <div className="card">
              <div className="section-header">
                <span className="section-title">📊 Timeframe Comparison</span>
              </div>
              <div className="tf-comparison">
                <div className="tf-row">
                  <div className="tf-header">Indicator</div>
                  <div className="tf-header" style={{ textAlign: 'center' }}>4H</div>
                  <div className="tf-header" style={{ textAlign: 'center' }}>1D</div>
                </div>
                {[
                  { label: 'Trend', k: 'emaTrend' },
                  { label: 'EMA Stack', k: 'emaStack' },
                  { label: 'MACD', k: 'macdBias' },
                  { label: 'RSI', k: 'rsiZone' },
                  { label: 'Ichimoku', k: 'ichimokuState' },
                  { label: 'Regime', k: 'regime' },
                ].map((row, i) => (
                  <div key={i} className="tf-row">
                    <div className="tf-label">{row.label}</div>
                    <div className={`tf-value ${getClass(feature4h?.[row.k])}`}>{feature4h?.[row.k]?.replace('-', ' ') || 'N/A'}</div>
                    <div className={`tf-value ${getClass(feature1d?.[row.k])}`}>{feature1d?.[row.k]?.replace('-', ' ') || 'N/A'}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* LLM Insight */}
            <div className="card">
              <div className="section-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                  <span className="section-title">🤖 LLM Insight & Inputs</span>
                  {llmInsight?.llmConvictionScore && (
                    <span className={`timeframe-badge ${getQualityClass(llmInsight.llmConvictionScore)}`}>
                      {llmInsight.llmConvictionScore}% ({llmInsight.llmBias || 'neutral'})
                    </span>
                  )}
                </div>
              </div>
              <div className="llm-insight-section">
                {llmInsight ? (
                  <>
                    <div className="insight-conviction-row">
                      <div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>LLM Conviction</span>
                        {llmInsight.llmBias && (
                          <span className={`conviction-badge conviction-${llmInsight.llmBias === 'up' ? 'up' : llmInsight.llmBias === 'down' ? 'down' : 'sideways'}`} style={{ marginLeft: '0.5rem' }}>
                            {llmInsight.llmBias === 'up' ? 'bullish' : llmInsight.llmBias === 'down' ? 'bearish' : llmInsight.llmBias}
                          </span>
                        )}
                      </div>
                      <span className={getQualityClass(llmInsight.llmConvictionScore || 50)} style={{ fontSize: '1.1rem', fontWeight: 600 }}>
                        {llmInsight.llmConvictionScore || 50}%
                      </span>
                    </div>

                    {llmInsight.rationale && (
                      <>
                        <div className="insight-section-title">Reasoning</div>
                        <p className="insight-rationale">{llmInsight.rationale}</p>
                      </>
                    )}

                    {llmInsight.usedFeaturesSummary?.length > 0 && (
                      <>
                        <div className="insight-section-title">Signals Considered</div>
                        <ul className="insight-features-list">
                          {llmInsight.usedFeaturesSummary.slice(0, 6).map((f, i) => <li key={i}>{f}</li>)}
                        </ul>
                      </>
                    )}

                    {llmInsight.riskNotes?.length > 0 && (
                      <>
                        <div className="insight-section-title" style={{ color: 'var(--accent-yellow)' }}>Risk Notes</div>
                        <ul className="insight-features-list" style={{ color: 'var(--accent-yellow)' }}>
                          {llmInsight.riskNotes.slice(0, 4).map((r, i) => <li key={i}>{r}</li>)}
                        </ul>
                      </>
                    )}

                    {llmInsight.usedNews?.length > 0 && (
                      <>
                        <div className="insight-section-title">Key News</div>
                        {llmInsight.usedNews.slice(0, 3).map((news, i) => (
                          <div key={i} className="insight-news-item">
                            <a href={news.url} target="_blank" rel="noreferrer" className="insight-news-title">
                              {news.sentiment === 'bullish' ? '🟢' : news.sentiment === 'bearish' ? '🔴' : '⚪'} {news.title}
                            </a>
                            <div className="insight-news-meta">
                              <span>{news.source}</span>
                              <span className={`insight-news-sentiment ${news.sentiment}`}>{news.sentiment}</span>
                            </div>
                          </div>
                        ))}
                      </>
                    )}

                    {llmInsight.outlookText && (
                      <>
                        <div className="insight-section-title">Outlook</div>
                        <p className="insight-rationale">{llmInsight.outlookText}</p>
                      </>
                    )}
                  </>
                ) : (
                  <div className="loading" style={{ height: 'auto', padding: '2rem' }}>Run analysis to see AI commentary.</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Outlook */}
          <div className="card">
            <div className="section-header">
              <span className="section-title">🔮 Outlook</span>
            </div>
            <div className="outlook-section">
              {outlook ? (
                <>
                  <div className="outlook-row"><span className="outlook-label">Next 1h:</span><span className="outlook-value">{outlook.horizon1h || outlook['1h'] || 'N/A'}</span></div>
                  <div className="outlook-row"><span className="outlook-label">Next 4h:</span><span className="outlook-value">{outlook.horizon4h || outlook['4h'] || 'N/A'}</span></div>
                  <div className="outlook-row"><span className="outlook-label">Next 24h:</span><span className="outlook-value">{outlook.horizon24h || outlook['24h'] || 'N/A'}</span></div>
                  <div className="outlook-row"><span className="outlook-label">Next 1w:</span><span className="outlook-value">{outlook.horizon1w || outlook['1w'] || 'N/A'}</span></div>
                </>
              ) : (
                <div style={{ color: 'var(--text-secondary)' }}>Outlook not available yet.</div>
              )}
            </div>
          </div>

          {/* Fear & Greed */}
          <div className="card">
            <div className="section-header">
              <span className="section-title">😱 Fear & Greed Index</span>
            </div>
            <div className="fear-greed-section">
              <div className="gauge-container">
                <div className="gauge-value" style={{ color: fgColor }}>{fgValue}</div>
                <div className="gauge-label">{fgLabel}</div>
              </div>
              <div className="fear-greed-bar">
                <div className="fear-greed-marker" style={{ left: `${fgValue}%` }}></div>
              </div>
            </div>
          </div>

          {/* Advice Cards */}
          {[advice4h, advice1d].filter(Boolean).map((advice, i) => (
            <div key={i} className="card advice-card">
              <div className="advice-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="symbol-badge">{advice.symbol}</span>
                  <span className="timeframe-badge">{advice.timeframe}</span>
                </div>
                <span className={`bias-badge bias-${advice.bias}`}>{advice.bias}</span>
              </div>

              <div className="score-row">
                <div className="score-item">
                  <div className="score-label">Composite</div>
                  <div className="score-value">{advice.compositeScore?.toFixed(0) || 'N/A'}</div>
                </div>
                <div className="score-item">
                  <div className="score-label">TA Score</div>
                  <div className="score-value">{advice.taScore?.toFixed(0) || 'N/A'}</div>
                </div>
                <div className="score-item">
                  <div className="score-label">Index Quality</div>
                  <div className={`score-value ${getQualityClass(advice.indexQuality || 0)}`}>{advice.indexQuality?.toFixed(0) || 'N/A'}</div>
                  <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)' }}>Rule-based signal quality</div>
                </div>
              </div>

              <div className="action-badge">{advice.action?.replace(/-/g, ' ')}</div>

              <ul className="rationale-list">
                {(advice.rationale || []).slice(0, 5).map((r, j) => <li key={j}>{r}</li>)}
              </ul>

              {advice.riskNotes?.length > 0 && (
                <div className="risk-section">
                  <div className="risk-title">⚠️ Risk Notes</div>
                  <ul className="risk-list" style={{ listStyle: 'none' }}>
                    {advice.riskNotes.map((r, j) => <li key={j}>{r}</li>)}
                  </ul>
                </div>
              )}
            </div>
          ))}

          <div className="disclaimer">
            ⚠️ <strong>Disclaimer:</strong> This is for research and education only. Not financial advice. Always do your own research.
          </div>
        </div>
      </main>
    </div>
  );

  function renderIndicators(feature) {
    if (!feature) return <div className="loading" style={{ height: 'auto', gridColumn: '1/-1' }}>No data</div>;

    const indicators = [
      { label: 'EMA Trend', value: feature.emaTrend },
      { label: 'EMA Stack', value: feature.emaStack },
      { label: 'MACD Bias', value: feature.macdBias },
      { label: 'RSI Zone', value: feature.rsiZone },
      { label: 'Ichimoku', value: feature.ichimokuState?.replace('-', ' ') },
      { label: 'ADX', value: feature.adxStrength?.replace('-', ' ') },
      { label: 'Stoch RSI', value: feature.stochRsiState },
      { label: 'Regime', value: feature.regime },
      { label: 'Sentiment', value: feature.sentimentBias },
      { label: 'Elliott Wave', value: formatElliott(feature.elliott), elliott: feature.elliott },
    ];

    return indicators.map((ind, i) => (
      <div key={i} className="indicator-item">
        <div className="indicator-label">{ind.label}</div>
        <div className={`indicator-value ${getClass(ind.value)}`}>
          {ind.value || 'N/A'}
          {ind.elliott?.confidence >= 20 && <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}> ({Math.round(ind.elliott.confidence)}%)</span>}
        </div>
      </div>
    ));
  }

  function formatElliott(elliott) {
    if (!elliott) return 'N/A';
    
    // If we have a specific wave label (from microservice)
    if (elliott.currentWaveLabel) {
      const struct = elliott.structure === 'impulse' ? 'Impulse' : elliott.structure === 'correction' ? 'Correction' : '';
      return `Wave ${elliott.currentWaveLabel}${struct ? ` (${struct})` : ''}`;
    }
    
    // Use phase from local detection
    if (elliott.phase && elliott.phase !== 'none' && elliott.confidence >= 40) {
      const phaseLabels = {
        'bull_impulse': 'Bull Impulse',
        'bear_impulse': 'Bear Impulse', 
        'correction': 'Correction',
        'range': 'Range'
      };
      return phaseLabels[elliott.phase] || elliott.phase;
    }
    
    return 'N/A';
  }
}

// ============================================================================
// Main Page
// ============================================================================
export default function TradingPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    fetch('/api/trading/auth')
      .then(res => res.json())
      .then(data => setIsAuthenticated(data.authenticated))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d1117' }}>
        <style>{styles}</style>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <style>{styles}</style>
        <LoginForm onLogin={() => setIsAuthenticated(true)} />
      </>
    );
  }

  return <Dashboard onLogout={() => setIsAuthenticated(false)} />;
}
