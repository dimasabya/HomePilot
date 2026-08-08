"use client";

import { useDeviceStore } from "@/store/deviceStore";
import { useEffect, useState } from "react";
import { Device } from "../types/device.types";
import DeviceCard from "./DeviceCard";
import AddDeviceDialog from "./dialogs/AddDeviceDialog";
import EditDeviceDialog from "./dialogs/EditDeviceDialog";

export default function DeviceList() {
  // const [devices, setDevices] = useState(initialDevices);
  const devices = useDeviceStore((state) => state.devices);
  // const loading = useDeviceStore((state) => state.loading);

  const [open, setOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "all" | "online" | "offline"
  >("all");

  const [roomFilter, setRoomFilter] = useState("all");

  const [sortBy, setSortBy] = useState<
    "name-asc" | "name-desc" | "room" | "latest"
  >("name-asc");

  const rooms = ["all", ...new Set(devices.map((d) => d.room))];

  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 4;

  let filteredDevices = [...devices];

  filteredDevices = filteredDevices.filter((device) => {
    const keyword = search.toLowerCase();

    return (
      device.name.toLowerCase().includes(keyword) ||
      device.code.toLowerCase().includes(keyword) ||
      device.room.toLowerCase().includes(keyword)
    );
  });

  if (statusFilter !== "all") {
    filteredDevices = filteredDevices.filter((device) =>
      statusFilter === "online" ? device.online : !device.online,
    );
  }

  if (roomFilter !== "all") {
    filteredDevices = filteredDevices.filter(
      (device) => device.room === roomFilter,
    );
  }

  switch (sortBy) {
    case "name-asc":
      filteredDevices.sort((a, b) => a.name.localeCompare(b.name));

      break;

    case "name-desc":
      filteredDevices.sort((a, b) => b.name.localeCompare(a.name));

      break;

    case "room":
      filteredDevices.sort((a, b) => a.room.localeCompare(b.room));

      break;
  }

  const totalPages = Math.ceil(filteredDevices.length / ITEMS_PER_PAGE);
  const paginatedDevices = filteredDevices.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter, roomFilter, sortBy]);
  return (
    <>
      <div className="md:mb-6 mb-2 flex items-center md:gap-3 gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search device..."
          className="w-full rounded-lg border md:px-4 px-2 md:py-2 text-sm md:text-base"
        />

        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-primary md:px-4 px-2 md:py-2 text-white text-sm md:text-base"
        >
          Search
        </button>
      </div>
      <div className="md:mt-4 flex flex-wrap md:gap-3 gap-2">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="rounded-lg border md:px-3 px-2 md:py-2 text-sm md:text-base"
        >
          <option value="all">All Status</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>

        <select
          value={roomFilter}
          onChange={(e) => setRoomFilter(e.target.value)}
          className="rounded-lg border md:px-3 px-2 md:py-2 text-sm md:text-base"
        >
          <option value="all">All Rooms</option>

          {/* nanti diisi otomatis */}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="rounded-lg border md:px-3 px-2 md:py-2 text-sm md:text-base"
        >
          <option value="name-asc">Name A-Z</option>
          <option value="name-desc">Name Z-A</option>
          <option value="room">Room</option>
          <option value="latest">Latest</option>
        </select>
        <select
          value={roomFilter}
          onChange={(e) => setRoomFilter(e.target.value)}
        >
          {rooms.map((room) => (
            <option key={room} value={room}>
              {room === "all" ? "All Rooms" : room}
            </option>
          ))}
        </select>
      </div>
      <div className="">
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg bg-primary md:px-4 px-2 md:py-2 text-white text-sm md:text-base"
        >
          + Add Device
        </button>
        <EditDeviceDialog
          open={editingDevice !== null}
          device={editingDevice}
          onClose={() => setEditingDevice(null)}
        />
        <AddDeviceDialog open={open} onClose={() => setOpen(false)} />
      </div>
      <p className="md:text-sm text-xs text-muted-foreground">
        Showing {paginatedDevices.length} of {filteredDevices.length} devices
      </p>
      <div className="grid gap-6 md:grid-cols-2">
        {paginatedDevices.length === 0 ? (
          <div className="rounded-xl border p-8 text-center text-muted-foreground text-sm md:text-base">
            Device tidak ditemukan
          </div>
        ) : (
          paginatedDevices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onEdit={setEditingDevice}
            />
          ))
        )}
      </div>
      <div className="md:mt-8 mt-4 flex items-center justify-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
          className="rounded border md:px-3 px-2 md:py-2 disabled:opacity-50"
        >
          Prev
        </button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`rounded border md:px-3 px-2 md:py-2 ${
              currentPage === index + 1 ? "bg-primary text-white" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
          className="rounded border md:px-3 px-2 md:py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}
