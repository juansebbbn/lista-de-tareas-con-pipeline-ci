/**
 * Estados posibles de una tarea.
 * Usamos un Enum para que en el CI/CD podamos validar que no se asignen estados inexistentes.
 */
export enum TaskStatus {
    PENDING = "PENDING",
    COMPLETED = "COMPLETED"
}

/**
 * Niveles de prioridad. 
 * Esto nos servirá para la lógica de "Tareas Urgentes".
 */
export enum Priority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH"
}

/**
 * Interfaz principal de la Tarea.
 * Nota: id es string porque usaremos crypto.randomUUID() para evitar colisiones.
 */
export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: Priority;
    createdAt: Date;
    dueDate?: Date; // Opcional, para tareas con fecha límite
}

/**
 * DTO (Data Transfer Object) para la creación.
 * Definimos exactamente qué campos permitimos que el usuario envíe por la API.
 */
export interface CreateTaskDTO {
    title: string;
    description: string;
    priority: Priority;
    dueDate?: string; // Viene como string (ISO) desde el JSON de la API
}

/**
 * Interfaz para las estadísticas de retorno.
 * Ideal para que el Frontend sepa exactamente qué datos recibirá.
 */
export interface TaskStats {
    total: number;
    completed: number;
    pending: number;
    completionRate: number;
    byPriority: {
        high: number;
        medium: number;
        low: number;
    };
}