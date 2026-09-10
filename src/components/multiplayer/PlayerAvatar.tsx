import { type Player } from '../../stores/multiplayerStore';

interface PlayerAvatarProps { player: Player; isCurrentUser?: boolean; }
export default function PlayerAvatar({ player, isCurrentUser }: PlayerAvatarProps) {
  const statusColors = { online: 'bg-success', playing: 'bg-primary-400', away: 'bg-warning' };
  return (
    <div className="flex items-center gap-3 p-3 glass rounded-xl">
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center text-sm font-medium">
          {player.username.charAt(0).toUpperCase()}
        </div>
        <div className={'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-neutral-900 ' + statusColors[player.status]} />
      </div>
      <div>
        <p className="text-sm font-medium">{player.username}{isCurrentUser ? ' (You)' : ''}</p>
        <p className="text-xs text-neutral-500 capitalize">{player.status}</p>
      </div>
    </div>
  );
}