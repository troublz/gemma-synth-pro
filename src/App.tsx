import { Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import LandingPage from './pages/LandingPage';
import PlayPage from './pages/PlayPage';
import TutorialPage from './pages/TutorialPage';
import MultiplayerPage from './pages/MultiplayerPage';
import RecordingsPage from './pages/RecordingsPage';
import SettingsPage from './pages/SettingsPage';
import PresetBrowserPage from './pages/PresetBrowserPage';
import './i18n';
export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/tutorial" element={<TutorialPage />} />
        <Route path="/multiplayer" element={<MultiplayerPage />} />
        <Route path="/recordings" element={<RecordingsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/presets" element={<PresetBrowserPage />} />
      </Routes>
    </AppShell>
  );
}