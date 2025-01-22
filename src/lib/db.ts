import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

// Example query function with caching disabled
export async function fetchProducts() {
  // Disable caching for this request
  noStore();

  try {
    const data = await sql`SELECT * FROM Product`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products data.');
  }
}

// Example query with parameters
export async function fetchProductById(id: string) {
  noStore();

  try {
    const data = await sql`
      SELECT * FROM Product 
      WHERE id = ${id}
    `;
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product.');
  }
}

// Example transaction
export async function createOrder(userId: string, items: OrderItem[], total: number) {
  try {
    // Using a simpler approach without explicit transaction
    // Create order
    const [order] = (await sql`
      INSERT INTO "Order" (userId, total, status)
      VALUES (${userId}, ${total}, 'PENDING')
      RETURNING id
    `).rows;

    // Insert order items
    for (const item of items) {
      await sql`
        INSERT INTO "OrderItem" (orderId, productId, quantity, price)
        VALUES (${order.id}, ${item.productId}, ${item.quantity}, ${item.price})
      `;
    }

    return order.id;
  } catch (error) {
    console.error('Transaction Error:', error);
    throw new Error('Failed to create order.');
  }
}

// Example search query
export async function searchProducts(query: string) {
  noStore();

  try {
    const data = await sql`
      SELECT * FROM Product 
      WHERE 
        name ILIKE ${`%${query}%`} OR 
        description ILIKE ${`%${query}%`}
    `;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to search products.');
  }
}

// Example pagination query
export async function getProductsPage(page: number = 1, pageSize: number = 10) {
  noStore();

  try {
    const offset = (page - 1) * pageSize;
    const data = await sql`
      SELECT * FROM Product 
      ORDER BY createdAt DESC 
      LIMIT ${pageSize} 
      OFFSET ${offset}
    `;
    
    const [count] = (await sql`SELECT COUNT(*) FROM Product`).rows;
    
    return {
      products: data.rows,
      total: Number(count.count),
      pages: Math.ceil(Number(count.count) / pageSize)
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products page.');
  }
} 