export interface Graphic {
  id?: number;
  type: 'completed' | 'planned';
  year: number;
  title: string; // Título para mostrar en el frontend
  // chartData ahora contiene la estructura directamente sin interfaces intermedias
  chartData: {
    name: string; // Nombre de la serie (ej: 'Sesiones Completadas')
    series: {
      name: string; // Nombre del punto de dato (ej: 'Ene', 'Feb')
      value: number;
    }[];
  }[];
}
