"use client"

import { useState } from "react"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Search, Plus, Pencil, Trash2 } from "lucide-react"
import { MenuModal } from "./menu-modal"

interface MenuItem {
  id: number
  title: string
  description: string
  image: string
  price: number
  category: string
}

const initialMenuItems: MenuItem[] = [
  {
    id: 1,
    title: "Truffle Risotto",
    description: "Creamy arborio rice with black truffle and parmesan",
    image: "/truffle-risotto.png",
    price: 32.0,
    category: "Main Course",
  },
  {
    id: 2,
    title: "Seared Scallops",
    description: "Pan-seared scallops with cauliflower puree and microgreens",
    image: "/seared-scallops.jpg",
    price: 38.0,
    category: "Appetizer",
  },
  {
    id: 3,
    title: "Beef Wellington",
    description: "Classic beef wellington with mushroom duxelles and puff pastry",
    image: "/beef-wellington.png",
    price: 45.0,
    category: "Main Course",
  },
  {
    id: 4,
    title: "Crème Brûlée",
    description: "Traditional French vanilla custard with caramelized sugar",
    image: "/classic-creme-brulee.png",
    price: 12.0,
    category: "Dessert",
  },
]

export function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems)
  const [searchTerm, setSearchTerm] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)

  const filteredItems = menuItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAdd = () => {
    setEditingItem(null)
    setModalOpen(true)
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
    setModalOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      setMenuItems(menuItems.filter((item) => item.id !== id))
    }
  }

  const handleSave = (item: MenuItem) => {
    if (editingItem) {
      setMenuItems(menuItems.map((i) => (i.id === item.id ? item : i)))
    } else {
      setMenuItems([...menuItems, { ...item, id: Date.now() }])
    }
    setModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-foreground">Menu Management</h3>
          <p className="mt-1 text-sm text-muted-foreground">Manage your restaurant's menu items and pricing</p>
        </div>
        <Button onClick={handleAdd} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Add Dish
        </Button>
      </div>

      <Card className="p-6 shadow-md">
        <div className="mb-6 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden shadow-sm transition-shadow hover:shadow-md">
              <div className="aspect-video w-full overflow-hidden">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="h-full w-full object-cover" />
              </div>
              <div className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{item.title}</h4>
                    <span className="mt-1 inline-flex rounded-full bg-secondary/20 px-2 py-0.5 text-xs font-medium text-secondary">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-accent">${item.price}</span>
                </div>
                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(item)} className="flex-1 gap-1">
                    <Pencil className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 gap-1 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      <MenuModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSave} item={editingItem} />
    </div>
  )
}
