import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

export function IaConfigCard() {
  const [rigidez, setRigidez] = useState(50);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSavedRigidez, setLastSavedRigidez] = useState(50);
  const initialMount = useRef(true);

  // Mock backend integration for initial fetch
  useEffect(() => {
    const fetchRigidez = async () => {
      try {
        // Mock API call GET
        // const response = await fetch('/admin/settings/rigidez');
        // const data = await response.json();
        // setRigidez(data.rigidez);
        // setLastSavedRigidez(data.rigidez);
      } catch (error) {
        console.error('Failed to fetch rigidez:', error);
      }
    };

    fetchRigidez();
  }, []);

  // Debounce logic for PATCH request
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      updateRigidity(rigidez);
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rigidez]);

  const updateRigidity = async (value: number) => {
    setIsSaving(true);
    setError(null);

    try {
      // Mock API call PATCH to /api/admin/settings
      await new Promise((resolve) => {
        setTimeout(() => {
          // Simulate success, but can be switched to reject to test error handling
          resolve('ok');
        }, 800);
      });
      setLastSavedRigidez(value);
    } catch (err) {
      console.error('Failed to update rigidez:', err);
      setError('Erro ao salvar');
      setRigidez(lastSavedRigidez); // Revert to last successful value
    } finally {
      setIsSaving(false);

      // Limpa mensagem de erro após alguns segundos
      if (error) {
        setTimeout(() => setError(null), 3000);
      }
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
            className="w-full h-10 rounded-lg border border-gray-200 bg-gray-100 opacity-70 px-3 text-sm text-gray-500 cursor-not-allowed"
            disabled
          >
            <option>Gemini 1.5 Flash</option>
          </select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-foreground block">
                Rigidez da Análise
              </label>
              {isSaving && (
                <span className="text-xs text-muted-foreground animate-pulse">
                  (Salvando...)
                </span>
              )}
              {error && <span className="text-xs text-red-500">{error}</span>}
            </div>
            <span className="text-sm font-bold text-primary">{rigidez}%</span>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="100"
              value={rigidez}
              onChange={(e) => setRigidez(Number(e.target.value))}
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
