import { useCallback, useState } from 'react'
import { ItemForm } from './ItemForm'

export const Item = ({ items, item, people, setItems }) => {
    const [isEditMode, setEditMode] = useState(false)
    const removeItem = useCallback((itemName) => {
        const itemsCopy = [...items]

        const itemIdx = itemsCopy.findIndex((items) => items.name === itemName)

        if (itemIdx !== -1) {
            itemsCopy.splice(itemIdx, 1)
        }

        setItems([...itemsCopy])
    }, [items, setItems])

    return (
        <div >
            { isEditMode ? 
                (
                    <div className="editform">
                        <ItemForm item={item} items={items} setItems={setItems} people={people} afterSave={() => setEditMode(false)} /> 
                    </div>
                ) : (
                    <div className={`item ${item.eaters.length === 0 ? "danger" : ""}`}>
                        <div className="itemInfo">
                            <div className="itemNamePrice">
                                <div className="itemName">{item.name}</div>
                                <div>(${item.price})</div>
                            </div>
                            <div>
                                {
                                    item.eaters.length > 0 ? 
                                    item.eaters.map(eaterIdx => people[eaterIdx].name).join(', ') : 
                                    <i>Nobody is paying for this</i>
                                }
                            </div>
                        </div>
                        <div className="item-actions">
                            <button onClick={() => setEditMode(true)}>EDIT</button>
                            <button onClick={() => removeItem(item.name)}>X</button>
                        </div>
                    </div>
                )}
        </div>
    )
}