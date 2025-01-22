import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { name, email, roleId, departmentId, isActive } = await req.json();
    
    const user = await prisma.user.update({
      where: { id: params.id },
      data: {
        name,
        email,
        roleId,
        departmentId,
        isActive,
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    return NextResponse.json({ error: 'Error updating user' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.user.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
  }
}
