# =============================================================================
# ðŸ’š ProductIQ v17 â€” Competitor Price Required + Feature Value Logic
# =============================================================================

class ProductIQInput(BaseModel):
    product_name: str
    features: list
    competitor_name: str
    competitor_price: float

@app.post("/api/product_iq")
def product_iq(req: ProductIQInput):

    if req.competitor_price <= 0:
        raise HTTPException(
            status_code=400,
            detail="competitor_price is required to calculate ProductIQ"
        )

    category = detect_category(req.product_name)
    table = FEATURE_VALUE_TABLE.get(category, FEATURE_VALUE_TABLE["general"])

    # feature score
    total_value = 0
    for f in req.features:
        key = f.lower().replace(" ", "").replace("-", "")
        total_value += table.get(key, 10)

    # pricing logic
    recommended = req.competitor_price + total_value
    fair = req.competitor_price + (total_value * 0.6)
    premium = req.competitor_price + (total_value * 1.3)

    return {
        "competitor": {
            "name": req.competitor_name,
            "price": req.competitor_price
        },
        "feature_value": total_value,
        "recommended_price": round(recommended, 2),
        "fair_price": round(fair, 2),
        "premium_price": round(premium, 2)
    }
