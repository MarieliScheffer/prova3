
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { sql } from "@vercel/postgres";

import { redirect } from "next/navigation";


export default async function NotebookRegistrationForm() {
 async function registerNotebook(formData: FormData) {
  'use server'
  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  await sql`INSERT INTO  notebooks (name, description) VALUES (${name}, ${description})` 
  console.log('Notebooks registrado:', { name, description })
 
  redirect('/dashboard/notebook/list');
 
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Cadastro de Notebooks</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={registerNotebook} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input type="text" id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input type="text" id="description" name="description" required />
            </div>
            <Button type="submit" className="w-full bg-black hover:bg-gray-800">
              Cadastrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

