const fetchDate = async () => {
    let res = await fetch('https://tiki.vn/api/personalish/v1/blocks/listings?limit=50&include=advertisement&aggregations=2&version=home-persionalized&trackity_id=631482cc-a0e9-a691-712b-8d5efb3daa8b&category=2150&page=1&urlKey=noi-that')
    let resp = await res.json()
    let data = resp.data
    return data
}

const postDate = async () => {
    const data = await fetchDate()
    // {
    //     "product_name": "New ihpone 15promax",
    //     "product_thumb": "product_thumb",
    //     "product_description": "String",
    //     "product_price": 50,
    //     "product_quantity": 5,
    //     "product_type": "clothing",
    //     "product_attributes": {
    //         "brand": "Levis",
    //         "size": "M",
    //         "material": "Denim",
    //         "color": "yellow-black"
    //     }
    // }
    data.map(async (item, index) => {
        const p = {
            product_name: item.name,
            product_thumb: item.thumbnail_url,
            product_description: item.name,
            product_price: item.price,
            product_quantity: 1,
            product_type: "clothing",
            product_category: index % 2 === 0 ? "classic" : "luxury",
            product_attributes: {
                "brand": "Levis",
                "size": "M",
                "material": "Denim",
                "color": "yellow-black"
            }
        }

        let res = await fetch('http://localhost:3052/v1/api/product', {
            method: 'POST',
            body: JSON.stringify(p),
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTczMWEyMTMxNmRiYjAzZDY5NGNmZjEiLCJpYXQiOjE3MDI1NjE2NDgsImV4cCI6MTcwMjczNDQ0OH0.3LJOLHc021MlTTcUmlDh-oKfndq0mYUeWEyf69GWRLI'
            },
        })

        console.log(await res.json())
    })
}

postDate()