# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install system dependencies
RUN apt-get update && apt-get install -y gcc libpq-dev

# Install watchdog
RUN pip install watchdog

# Copy the requirements file into the container
COPY requirements.txt ./

RUN pip install --upgrade pip setuptools wheel

# Install any dependencies in the requirements.txt file
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container
COPY . .

# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV WATCHDOG 1

# Expose the port the app runs on
EXPOSE 8000

# Run the development server with watchdog
CMD ["watchmedo", "auto-restart", "--patterns=*.py", "--recursive", "--", "python", "manage.py", "runserver", "0.0.0.0:8000"]
