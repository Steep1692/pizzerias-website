import json
from fastapi import Request
from fastapi import FastAPI, Path, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
origins = ["*"]  # Allow requests from any origin

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


ORDERS_FILE_PATH = "./database/orders.json"

# Endpoint to get pizzas of the specified pizzerias

@app.get("/pizzas/{pizzeria_id}/{pizza_id}", response_class=JSONResponse)
def get_pizza_by_id(pizzeria_id: int = Path(..., title="Pizzeria ID"), pizza_id: int = Path(..., title="Pizza ID")):
    try:
        with open("./database/pizza_templates.json", "r") as file:
            pizza_templates_data = json.load(file)

            # Find the pizza template with the specified pizza_id
            pizza_template = next(
                (template for template in pizza_templates_data if template.get("id") == pizza_id),
                None
            )

            if pizza_template:
                # Check if the pizza template is available in the specified pizzeria
                if pizzeria_id in pizza_template.get("available_in_pizzerias", []):
                    return pizza_template
                else:
                    raise HTTPException(status_code=404, detail="Pizza not available in the specified pizzeria")
            else:
                raise HTTPException(status_code=404, detail="Pizza not found")
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="File not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@app.get("/pizzas/{pizzeria_id}", response_class=JSONResponse)
def get_pizzeria_by_id(pizzeria_id: int = Path(..., title="Pizzeria ID")):
    try:
        with open("./database/pizza_templates.json", "r") as file:
            pizza_templates_data = json.load(file)

            # Filter pizza templates based on pizzeria_id
            filtered_templates = [
                template
                for template in pizza_templates_data
                if pizzeria_id in template.get("available_in_pizzerias", [])
            ]

            return filtered_templates
    except FileNotFoundError:
        return JSONResponse(content={"error": "File not found"}, status_code=404)
    except Exception as e:
        return JSONResponse(
            content={"error": f"An error occurred: {str(e)}"}, status_code=500
        )

# Endpoint to get pizzerias list
@app.get("/pizzerias/{pizzeria_id}", response_class=JSONResponse)
def get_pizzerias(pizzeria_id: int = Path(..., title="Pizzeria ID")):
    try:
        with open("./database/pizzerias.json", "r") as file:
            pizzerias_data = json.load(file)

            # Find the pizza template with the specified pizza_id
            pizzeria_data = next(
                (template for template in pizzerias_data if template.get("id") == pizzeria_id),
                None
            )

            if pizzeria_data:
                return pizzeria_data
            else:
                raise HTTPException(status_code=404, detail="Pizzeria not found")

    except FileNotFoundError:
        return JSONResponse(content={"error": "File not found"}, status_code=404)
    except Exception as e:
        return JSONResponse(content={"error": f"An error occurred: {str(e)}"}, status_code=500)

# Endpoint to get pizzerias list
@app.get("/pizzerias", response_class=JSONResponse)
def get_pizzerias():
    try:
        with open("./database/pizzerias.json", "r") as file:
            pizzarias_data = json.load(file)
            return pizzarias_data
    except FileNotFoundError:
        return JSONResponse(content={"error": "File not found"}, status_code=404)
    except Exception as e:
        return JSONResponse(content={"error": f"An error occurred: {str(e)}"}, status_code=500)

# Endpoint to get the current settings (like taxes) for the specified country
@app.get("/settings", response_class=JSONResponse)
def get_settings():
    try:
        with open("./database/settings.json", "r") as file:
            data = json.load(file)
            return data
    except FileNotFoundError:
        return JSONResponse(content={"error": "File not found"}, status_code=404)
    except Exception as e:
        return JSONResponse(content={"error": f"An error occurred: {str(e)}"}, status_code=500)


# Endpoint to receive and append a string to the orders JSON file
@app.post("/order")
async def create_order(total: float, request: Request):
    try:
        # Validate the input number
        if not isinstance(total, (int, float)):
            raise HTTPException(status_code=400, detail="Input must be a valid number")

        # Read existing orders from the file
        existing_orders = []
        try:
            with open(ORDERS_FILE_PATH, "r") as file:
                existing_orders = json.load(file)
        except FileNotFoundError:
            pass  # File doesn't exist yet, it will be created

        # Append the new order to the list
        existing_orders.append(total)

        # Write the updated list back to the file
        with open(ORDERS_FILE_PATH, "w") as file:
            json.dump(existing_orders, file, indent=2)

        return JSONResponse(content={"message": "Order created successfully"}, status_code=201)
    except Exception as e:
        return JSONResponse(content={"error": f"An error occurred: {str(e)}"}, status_code=500)

