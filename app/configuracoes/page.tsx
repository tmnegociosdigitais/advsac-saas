import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { Users } from 'lucide-react'

export default function ConfiguracoesPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Configurações do Sistema</h1>

      <Tabs defaultValue="usuarios" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="usuarios">Usuários</TabsTrigger>
          <TabsTrigger value="sistema">Sistema</TabsTrigger>
        </TabsList>

        {/* Aba de Gerenciamento de Usuários */}
        <TabsContent value="usuarios">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Usuários</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Link 
                href="/admin/users" 
                className="flex items-center p-4 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
              >
                <Users className="h-6 w-6 mr-2" />
                <div>
                  <h3 className="font-medium">Gerenciar Usuários e Permissões</h3>
                  <p className="text-sm text-muted-foreground">
                    Adicione, edite ou remova usuários do sistema e gerencie suas permissões
                  </p>
                </div>
              </Link>

              <div className="space-y-4">
                <h3 className="font-medium">Configurações Rápidas</h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label>Convite por E-mail</Label>
                    <div className="flex gap-4">
                      <Input placeholder="email@exemplo.com" type="email" />
                      <Button>Enviar Convite</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba de Configurações do Sistema */}
        <TabsContent value="sistema">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">Fuso Horário</Label>
                <Input id="timezone" placeholder="Selecione o fuso horário" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Input id="language" placeholder="Selecione o idioma" />
              </div>

              <div className="flex justify-end">
                <Button>Salvar Configurações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  )
}
