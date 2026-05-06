import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

export function IaConfigCard() {
  const [rigidez, setRigidez] = useState(50);

  // Mock backend integration
  useEffect(() => {
    // GET current rigidez from backend
    const fetchRigidez = async () => {
      try {
        // Mock API call
        // const response = await fetch('/admin/settings/rigidez');
        // const data = await response.json();
        // setRigidez(data.rigidez);
      } catch (error) {
        console.error('Failed to fetch rigidez:', error);
      }
    };

    fetchRigidez();
  }, []);

  const handleRigidezChange = async (value: number) => {
    setRigidez(value);

    // Debounced PATCH request to backend
    try {
      // Mock API call
      // await fetch('/admin/settings/rigidez', {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ rigidez: value })
      // });
    } catch (error) {
      console.error('Failed to update rigidez:', error);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Configurações globais da IA
      </h3>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Modelo de IA Principal
          </label>
          <select
            className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-black cursor-not-allowed"
            disabled
          >
            <option>Gemini 1.5 Flash</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Rigidez da Análise
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="100"
              value={rigidez}
              onChange={(e) => handleRigidezChange(Number(e.target.value))}
              className="w-full h-2 bg-white rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${rigidez}%, #ffffff ${rigidez}%, #ffffff 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Suave</span>
              <span>Rigoroso</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
