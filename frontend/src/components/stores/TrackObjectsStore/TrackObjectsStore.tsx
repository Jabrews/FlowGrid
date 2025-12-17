import { create } from "zustand"
import type { TrackObj } from "../../Grid/GridItemHeader/util/track_obj_type";

type TrackObjectStore = { 
    getTrackObjects :  () => TrackObj[],
    setTrackObjects : (newTrackObjs : TrackObj[]) => void,
    addTrackObj : (newItem : TrackObj) => void,
    deleteTrackObj : (itemI : string) => void, //grid item or tracker
}

const localStorageKey =  "track-objects";



export const useTrackObjectsStore = create<TrackObjectStore>(() => ({
    getTrackObjects: () => {
        try {
            const raw = localStorage.getItem(localStorageKey)
            if (!raw) return [] as TrackObj[]
            const parsed = JSON.parse(raw) as TrackObj[]
            return Array.isArray(parsed) ? parsed : []
        } catch (err) {
            console.error("Failed to read track objects from localStorage", err)
            return [] as TrackObj[]
        }
    },
    setTrackObjects : (newTrackObjs : TrackObj[]) => {
        localStorage.setItem(localStorageKey, JSON.stringify(newTrackObjs))
    },
    addTrackObj : (newItem : TrackObj) => {
        const raw = localStorage.getItem(localStorageKey)
        if (!raw) {
            const list = [newItem]
            localStorage.setItem('track-objects', JSON.stringify(list))
            return
        }
        const parsed = JSON.parse(raw) as TrackObj[]
        const duplicate = parsed.find((item : TrackObj) => 
            item.trackerI === newItem.trackerI &&
            item.gridItemI === newItem.gridItemI 
        )
        if (duplicate) {
            throw new Error('duplicate found')
        }
        parsed.push(newItem)
        localStorage.setItem('track-objects', JSON.stringify(parsed))
    },

    deleteTrackObj : (itemI : string) => {
        const raw = localStorage.getItem(localStorageKey)
        if (!raw) throw new Error('unable to find trackObj in LS')
        const parsed = JSON.parse(raw) as TrackObj[]
        const newItems = parsed.filter(
        (item: TrackObj) =>
            item.gridItemI !== itemI &&
            item.trackerI !== itemI
        );
        localStorage.setItem('track-objects', JSON.stringify(newItems))
    }
}))

// no custom hook for setting track objects do with hook

export const useTrackObjects = () =>
    useTrackObjectsStore((s) => s.getTrackObjects)

export const useAddTrackObj = () =>
    useTrackObjectsStore((s) => s.addTrackObj)

export const useDeleteTrackObj = () =>
    useTrackObjectsStore((s) => s.deleteTrackObj)
