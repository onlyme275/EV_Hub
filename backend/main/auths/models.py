from django.db import models
from django.contrib.auth.models import AbstractUser
import qrcode
from io import BytesIO
from django.core.files import File

class User(AbstractUser):
    ROLE_CHOICE = (
        ("A", "Admin"),
        ("P", "Passenger"),
        ("D", "Driver")
    )

    email = models.EmailField(max_length=50, unique=True)
    role = models.CharField(max_length=1, choices=ROLE_CHOICE, default='A')

    qr_code = models.ImageField(upload_to="qr_codes/", blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        is_new = self._state.adding
        super().save(*args, **kwargs)

        # Generate QR only if not exists
        if is_new and not self.qr_code:
            data = f"ID:{self.id},Email:{self.email},Role:{self.role}"

            qr = qrcode.make(data)

            buffer = BytesIO()
            qr.save(buffer, format="PNG")

            file_name = f"user_{self.id}.png"
            self.qr_code.save(file_name, File(buffer), save=False)
            
            # Save only the qr_code field to avoid duplicate insert errors
            # and to be more efficient.
            super().save(update_fields=['qr_code'])

    def __str__(self):
        return self.username if self.username else self.email
