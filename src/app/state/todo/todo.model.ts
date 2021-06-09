export class ToDo {
  constructor(
    public id: number,
    public task: string,
    public complete: boolean
  ) {}
}

export function generateToDos(): ToDo[] {
  return [
    {
      id: 1,
      task: 'Watch Ozark Season 2',
      complete: false
    },
    {
      id: 2,
      task: 'Use NgRx in my to-do app',
      complete: true
    }
  ];
}
