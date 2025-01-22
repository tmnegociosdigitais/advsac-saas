'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface User {
  id: string;
  name: string;
  email: string;
  role: {
    id: string;
    name: string;
  };
  department?: {
    id: string;
    name: string;
  };
  isActive: boolean;
  createdAt: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Erro ao carregar usuários');
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Erro ao carregar usuários');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const url = editingUser 
        ? `/api/users/${editingUser.id}`
        : '/api/users';
        
      const method = editingUser ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Erro ao salvar usuário');
      }
      
      fetchUsers();
      reset();
      setEditingUser(null);
    } catch (err) {
      setError('Erro ao salvar usuário');
      console.error('Erro:', err);
    }
  };

  const deleteUser = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;
    
    try {
      const response = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Erro ao excluir usuário');
      }
      fetchUsers();
    } catch (err) {
      setError('Erro ao excluir usuário');
      console.error('Erro:', err);
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Gerenciamento de Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  {...register('name')}
                  placeholder="Nome completo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  {...register('email')}
                  type="email"
                  placeholder="email@exemplo.com"
                />
              </div>
              {!editingUser && (
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    {...register('password')}
                    type="password"
                    placeholder="Digite a senha"
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end">
              {editingUser && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingUser(null);
                    reset();
                  }}
                  className="mr-2"
                >
                  Cancelar
                </Button>
              )}
              <Button type="submit">
                {editingUser ? 'Atualizar' : 'Adicionar'} Usuário
              </Button>
            </div>
          </form>

          {loading ? (
            <div className="text-center py-4">Carregando...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>E-mail</TableHead>
                  <TableHead>Cargo</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role.name}</TableCell>
                    <TableCell>{user.department?.name}</TableCell>
                    <TableCell>
                      <Badge variant={user.isActive ? 'success' : 'secondary'}>
                        {user.isActive ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingUser(user)}
                        className="mr-2"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteUser(user.id)}
                      >
                        Excluir
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
