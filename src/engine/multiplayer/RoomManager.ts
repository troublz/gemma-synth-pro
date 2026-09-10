import { type Player } from '../../stores/multiplayerStore';

export class RoomManager {
  private players: Player[] = [];
  addPlayer(p: Player): void {
    this.players = this.players.filter((x) => x.id !== p.id).concat(p);
  }
  removePlayer(id: string): void {
    this.players = this.players.filter((p) => p.id !== id);
  }
  getPlayers(): Player[] { return this.players; }
  reset(): void { this.players = []; }
}