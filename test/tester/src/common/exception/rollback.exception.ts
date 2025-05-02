export class ForRollbackException extends Error {
  constructor() {
    super('rollback');
    this.name = 'For Rollback';
  }
}
