import { type Task, TaskStatus, Priority } from "../core/task_model.js";

export class TaskService {
  private tasks: Task[] = [];

  constructor() {
    // Solo en memoria: no hay persistencia
    this.tasks = [];
  }

  async getAll(status?: TaskStatus) {
    return status ? this.tasks.filter((t) => t.status === status) : this.tasks;
  }

  async create(
    data: Pick<Task, "title" | "description" | "priority" | "dueDate">,
  ) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...data,
      status: TaskStatus.PENDING,
      createdAt: new Date(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  async updateStatus(id: string, status: TaskStatus) {
    const task = this.tasks.find((t) => t.id === id);
    if (task) {
      task.status = status;
    }
    return task;
  }

  async delete(id: string) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  async getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter((t) => t.status === TaskStatus.COMPLETED).length;
    return {
      total,
      completed,
      pending: total - completed,
      completionRate: total > 0 ? (completed / total) * 100 : 0,
      byPriority: {
        high: this.tasks.filter((t) => t.priority === Priority.HIGH).length,
        medium: this.tasks.filter((t) => t.priority === Priority.MEDIUM).length,
        low: this.tasks.filter((t) => t.priority === Priority.LOW).length,
      },
    };
  }

  async getUrgentReminders() {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    return this.tasks.filter((t) => {
      if (!t.dueDate || t.status === TaskStatus.COMPLETED) return false;
      const due = new Date(t.dueDate);
      return due > now && due <= tomorrow && t.priority === Priority.HIGH;
    });
  }
}
