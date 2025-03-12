from django.db import models
from django.conf import settings
from products.models import Product

class Order(models.Model):
    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('Processing', 'Processing'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
        ('Cancelled', 'Cancelled'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='orders')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Add this field to allow setting total_amount
    _total_amount = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        default=0.00, 
        verbose_name='Total Amount'
    )

    @property
    def total_amount(self):
        # If _total_amount is 0, calculate from items
        if self._total_amount == 0 and self.id:  # Ensure the order is saved
            return sum(item.price * item.quantity for item in self.items.all())
        return self._total_amount

    def save(self, *args, **kwargs):
        # Avoid calculating total_amount during initial save
        if not self.id:  # If the order is being created
            super().save(*args, **kwargs)  # Save the order first to generate a primary key
        else:
            # Calculate total_amount only if the order already exists
            self._total_amount = sum(item.price * item.quantity for item in self.items.all())
            super().save(*args, **kwargs)

    def __str__(self):
        return f"Order {self.id} - {self.user.username}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"