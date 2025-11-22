"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface MenuItem {
  id: number
  title: string
  description: string
  image: string
  price: number
  category: string
}

interface MenuModalProps {
  open: boolean
  onClose: () => void
  onSave: (item: MenuItem) => void
  item: MenuItem | null
}

export function MenuModal({ open, onClose, onSave, item }: MenuModalProps) {
  const [formData, setFormData] = useState<MenuItem>({
    id: 0,
    title: "",
    description: "",
    image: "/colorful-pasta-dish.png",
    price: 0,
    category: "Main Course",
  })

  useEffect(() => {
    if (item) {
      setFormData(item)
    } else {
      setFormData({
        id: 0,
        title: "",
        description: "",
        image: "/colorful-pasta-dish.png",
        price: 0,
        category: "Main Course",
      })
    }
  }, [item, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">{item ? "Edit Menu Item" : "Add New Dish"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Dish Name</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="mt-1 bg-background"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              className="mt-1 bg-background"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="image">URL img</Label>
                      <Input
                        id="image"
                        type="string"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        required
                        className="mt-1 bg-background"
                      />
          </div>
          <div>
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) })}
              required
              className="mt-1 bg-background"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              {item ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
