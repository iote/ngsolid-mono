import { Query } from '@ngfire/firestore-qbuilder';

export abstract class EntityQuery<T>
{
  public abstract readonly id: string;

  public abstract isSameOrWithin(q: EntityQuery<T>) : 'within' | 'overlap' | false;

  public abstract fromParent(q: EntityQuery<T>, values: T) : T;
  public abstract fromRoot() : Query[];
}
