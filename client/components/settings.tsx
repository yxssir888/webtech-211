import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold text-foreground">Settings</h3>
        <p className="mt-1 text-sm text-muted-foreground">Manage your restaurant settings and preferences</p>
      </div>

      <Card className="p-6 shadow-md">
        <h4 className="mb-4 text-lg font-semibold text-foreground">Restaurant Information</h4>
        <div className="space-y-4">
          <div>
            <Label htmlFor="restaurant-name">Restaurant Name</Label>
            <Input id="restaurant-name" defaultValue="Webtech211" className="mt-1 bg-background" />
          </div>
          <div>
            <Label htmlFor="email">Contact Email</Label>
            <Input id="email" type="email" defaultValue="contact@webtech.com" className="mt-1 bg-background" />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="mt-1 bg-background" />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              defaultValue="123 Culinary Street, Food City, FC 12345"
              className="mt-1 bg-background"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Save Changes</Button>
        </div>
      </Card>

      <Card className="p-6 shadow-md">
        <h4 className="mb-4 text-lg font-semibold text-foreground">Operating Hours</h4>
        <div className="space-y-3">
          {[
            { day: "Monday - Friday", hours: "11:00 AM - 10:00 PM" },
            { day: "Saturday", hours: "10:00 AM - 11:00 PM" },
            { day: "Sunday", hours: "10:00 AM - 9:00 PM" },
          ].map((schedule) => (
            <div key={schedule.day} className="flex justify-between border-b border-border pb-3 last:border-0">
              <span className="text-sm font-medium text-foreground">{schedule.day}</span>
              <span className="text-sm text-muted-foreground">{schedule.hours}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <Button variant="outline">Edit Hours</Button>
        </div>
      </Card>
    </div>
  )
}
