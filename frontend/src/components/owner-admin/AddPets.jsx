import { useState } from "react";
import Sidebar from "./SidebarAdd";
import USER_IMG from "../../assets/images/user.png";
import PET_IMG from "../../assets/images/dog1.jpg";






// ── Shared Icon ──────────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, fill = 0, className = "" }) => (
  <span
    className={`material-symbols-outlined leading-none ${className}`}
    style={{ fontSize: size, fontVariationSettings: `'FILL' ${fill}` }}
  >
    {name}
  </span>
);

// ── Field wrapper ────────────────────────────────────────────────────────────
const Field = ({ label, children }) => (
  <div>
    <label className="block text-[10px] font-bold text-[#2c6370] uppercase tracking-widest mb-1.5">
      {label}
    </label>
    {children}
  </div>
);

const inputCls =
  "w-full bg-[#adecff] border-none rounded-lg px-4 py-4  text-sm text-[#00343e] outline-none focus:ring-2 focus:ring-[#00656f]/40 transition-all placeholder:text-[#2c6370]/50";

// ── Main Page ────────────────────────────────────────────────────────────────
export default function AddPets({ initialData, onSubmit, onCancel, isEditMode }) {
  const [name, setName] = useState(initialData?.name || "");
  const [animalType, setAnimalType] = useState(
    initialData?.species === 1 ? "Cat" :
      initialData?.species === 2 ? "Bird" :
        initialData?.species === 3 ? "Rabbit" : "Dog"
  );
  const [breed, setBreed] = useState(initialData?.breed || "");
  const [age, setAge] = useState(initialData?.age || "");
  const [ageUnit, setAgeUnit] = useState(initialData?.ageUnit === 0 ? "Months" : "Years");
  const [gender, setGender] = useState(initialData?.gender === 1 ? "female" : "male");
  const [images, setImages] = useState(initialData?.imageUrls ? initialData.imageUrls.split(',') : []);
  const [newImageUrl, setNewImageUrl] = useState("");

  // UI Only State (Not mapped to current backend)
  const [description, setDescription] = useState(initialData?.description || "");
  const [location, setLocation] = useState(initialData?.location || "");
  const [health, setHealth] = useState(initialData?.healthStatus ? initialData.healthStatus.split(', ') : ["Vaccinated", "Neutered"]);

  const toggleHealth = (tag) =>
    setHealth((h) => (h.includes(tag) ? h.filter((x) => x !== tag) : [...h, tag]));

  const handleAddImage = () => {
    if (newImageUrl && !images.includes(newImageUrl)) {
      setImages([...images, newImageUrl]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Map to backend Species enum
    let speciesEnum = 0; // Dog
    if (animalType === "Cat") speciesEnum = 1;
    if (animalType === "Bird") speciesEnum = 2;
    if (animalType === "Rabbit") speciesEnum = 3;

    // Map to backend Gender enum
    const genderEnum = gender === "female" ? 1 : 0;

    // Map to backend AgeUnit enum
    const ageUnitEnum = ageUnit === "Months" ? 0 : 1;

    onSubmit({
      id: initialData?.id || 0,
      ownerId: initialData?.ownerId || 0,
      name: name,
      breed: breed,
      age: parseInt(age) || 0,
      ageUnit: ageUnitEnum,
      species: speciesEnum,
      gender: genderEnum,
      description: description,
      location: location,
      healthStatus: health.join(', '),
      imageUrls: images.join(',') || PET_IMG,
      status: initialData?.status !== undefined ? initialData.status : 1 // Default to PendingReview
    });
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#e9f9ff]">
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Be Vietnam Pro', sans-serif; }
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined'; font-style: normal;
          display: inline-block; line-height: 1; white-space: nowrap;
          -webkit-font-smoothing: antialiased; vertical-align: middle;
        }
      `}</style>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#e9f9ff]/80 backdrop-blur-xl px-8 py-4 flex items-center justify-between border-b border-[#81b5c5]/20">
        <div>
          <nav className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#2c6370] mb-1">
            <span onClick={onCancel} className="hover:text-[#00656f] cursor-pointer transition-colors">My Pets</span>
            <Icon name="chevron_right" size={13} className="text-[#2c6370]" />
            <span className="text-[#00656f]">{isEditMode ? "Edit Listing" : "Add New Listing"}</span>
          </nav>
          <h2
            className="text-2xl font-black text-[#00343e] tracking-tight"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {isEditMode ? "Edit Pet Profile" : "Create a Pet Profile"}
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onCancel} type="button" className="px-5 py-2 text-[#00656f] font-bold text-sm hover:underline">Cancel</button>
          <button onClick={handleSubmit} type="button" className="px-6 py-2.5 rounded-full font-bold text-sm text-[#d4f9ff] shadow-lg shadow-[#00656f]/20 active:scale-95 transition-all"
            style={{ background: "linear-gradient(135deg,#00656f,#005861)" }}>
            Save Draft
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto px-8 py-6">
        <form onSubmit={handleSubmit} className="w-[1400px] mx-auto">
          <div className="grid grid-cols-12 gap-8">

            {/* ── Left: Media ── */}
            <div className="col-span-5 space-y-5">

              {/* Gallery card */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-[#81b5c5]/15">
                <h3 className="text-sm font-bold flex items-center gap-2 mb-2 text-[#006770]"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  <Icon name="photo_library" size={18} className="text-[#006770]" />
                  Pet Gallery
                </h3>
                <p className="text-xs text-[#2c6370] leading-relaxed mb-4">
                  High-quality photos significantly increase adoption rates. Please upload at least 3 photos showing different angles.
                </p>

                <Field label="Image URL">
                    <div className="flex gap-2 mb-4">
                      
                      {/* Input URL */}
                      <input
                        className={`${inputCls}`}
                        placeholder="https://..."
                        type="text"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddImage();
                          }
                        }}
                      />

                      <label className="cursor-pointer">
  <input
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }}
  />

  <div className="px-4 py-2 rounded-xl border border-[#00656f] text-[#00656f] font-bold text-xs hover:bg-[#00656f]/5 transition-colors whitespace-nowrap flex items-center gap-2">
    <span className="material-symbols-outlined text-base">
      upload
    </span>
    Upload from device
  </div>
</label>

                      {/* Add button */}
                      <button
                        type="button"
                        onClick={handleAddImage}
                        className="px-4 py-2 rounded-xl border border-[#00656f] text-[#00656f] font-bold text-xs hover:bg-[#00656f]/5 transition-colors whitespace-nowrap"
                      >
                        Add Image
                      </button>

                    </div>
                  </Field>

                {images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2.5">
                    {images.map((img, idx) => (
                      <div key={idx} className={`${idx === 0 ? 'col-span-2 aspect-[4/3]' : 'aspect-square'} rounded-xl bg-[#adecff] border border-[#81b5c5]/30 flex flex-col items-center justify-center overflow-hidden relative group`}>
                        <img src={img} alt="Pet" className="w-full h-full object-cover absolute inset-0" />
                        <div className="absolute inset-0 bg-[#00343e]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button type="button" onClick={() => handleRemoveImage(idx)} className="text-white bg-error p-2 rounded-full hover:scale-110 transition-transform shadow-lg">
                            <Icon name="delete" size={20} />
                          </button>
                        </div>
                        {idx === 0 && <span className="absolute top-3 left-3 bg-primary text-white text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full font-bold shadow-md">Primary</span>}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="aspect-[4/3] rounded-xl bg-[#adecff] border-2 border-dashed border-[#81b5c5] flex flex-col items-center justify-center text-[#2c6370]">
                    <Icon name="add_a_photo" size={36} className="mb-2" />
                    <p className="text-xs font-bold mt-2 text-[#00343e]">No Images Added</p>
                    <p className="text-[10px]">Add an image URL above</p>
                  </div>
                )}
              </div>

              {/* Preview card */}
              <div className="rounded-2xl overflow-hidden shadow-lg relative">
                <img src={images[0] || PET_IMG} alt="Example pet" className="w-full h-44 object-cover opacity-80" />
                <div className="absolute inset-0 flex items-end p-5"
                  style={{ background: "linear-gradient(to top, #00656fcc, transparent)" }}>
                  <p className="text-white text-xs leading-relaxed italic">
                    "This is how your primary photo will look on the 'Browse' page. Clean backgrounds work best!"
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right: Form ── */}
            <div className="col-span-7 space-y-6">

              {/* Essential Details */}
              <section>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#00656f] flex items-center gap-1.5 mb-4">
                  <Icon name="info" size={15} className="text-[#00656f]" />
                  Essential Details
                </h3>
                <div className="grid grid-cols-2 gap-4 mb-12">
                  <div className="col-span-2 mt-3">
                    <Field label="Pet Name">
                      <input className={inputCls} placeholder="e.g. Luna" type="text" value={name} onChange={e => setName(e.target.value)} required />
                    </Field>
                  </div>
                  <Field label="Animal Type">
                    <select className={inputCls} value={animalType} onChange={e => setAnimalType(e.target.value)}>
                      {["Dog", "Cat", "Rabbit", "Bird"].map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="Breed">
                    <input className={inputCls} placeholder="e.g. Golden Retriever" type="text" value={breed} onChange={e => setBreed(e.target.value)} />
                  </Field>
                  <Field label="Age">
                    <div className="flex gap-2">
                      <input className={inputCls} placeholder="2" type="number" min="0" value={age} onChange={e => setAge(e.target.value)} required />
                      <select className="bg-[#adecff] border-none rounded-lg px-3 py-2.5 text-sm text-[#00343e] outline-none focus:ring-2 focus:ring-[#00656f]/40"
                        value={ageUnit} onChange={e => setAgeUnit(e.target.value)}>
                        <option value="Years">Years</option>
                        <option value="Months">Months</option>
                      </select>
                    </div>
                  </Field>
                  <Field label="Gender">
                    <div className="flex gap-2">
                      {["Male", "Female"].map((g) => (
                        <button key={g} type="button" onClick={() => setGender(g.toLowerCase())}
                          className={`flex-1 py-4 rounded-lg text-sm font-bold transition-colors ${gender === g.toLowerCase()
                              ? "bg-[#00656f]/20 border border-[#00656f]/30 text-[#00656f]"
                              : "bg-[#adecff] text-[#2c6370] hover:bg-[#00656f]/10"
                            }`}>
                          {g}
                        </button>
                      ))}
                    </div>
                  </Field>
                </div>
              </section>

              {/* Health & Personality */}
              <section className=" bg-[#d9f6ff] rounded-3xl p-5 border border-[#81b5c5]/20">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#00656f] mb-5 mt-3">
                  Health & Personality
                </h3>
                <div className="space-y-4">
                  <Field label="Health Status">
                    <div className="flex flex-wrap gap-2 mt-1">
                      {["Vaccinated", "Neutered", "Microchipped", "Dewormed"].map((tag) => (
                        <button key={tag} type="button" onClick={() => toggleHealth(tag)}
                          className={`px-3 py-1.5 mb-3 rounded-full text-xs font-bold border flex items-center gap-1 transition-colors ${health.includes(tag)
                              ? "bg-white border-[#81b5c5]/30 text-[#00343e]"
                              : "bg-white/50 border-[#81b5c5]/20 text-[#2c6370]"
                            }`}>
                          {health.includes(tag)
                            ? <Icon name="check_circle" size={14} className="text-green-600" fill={1} />
                            : <Icon name="add" size={14} className="text-[#00656f]" />}
                          {tag}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <Field label="Description / Story">
                    <textarea
                      className="w-full bg-white border-none rounded-lg px-4 py-3 text-md  outline-none focus:ring-2 focus:ring-[#00656f]/40 transition-all resize-none placeholder:text-[#2c6370]/50"
                      rows={6}
                      placeholder="Tell the pet's unique story. Mention personality quirks, favorite toys, and ideal home environment..."
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                    />
                    <p className="text-[10px] text-[#2c6370] text-right mt-3 mb-5">
                      Min 100 characters. Currently: {description.length}
                    </p>
                  </Field>
                </div>
              </section>

              {/* Logistics */}
              <section>
                <h3 className="text-[11px] font-black uppercase tracking-widest text-[#00656f] mb-5 mt-9">
                  Logistics
                </h3>
                <Field label="Shelter Location" >
                  <div className="relative mt-2 mb-10">
                    <Icon name="location_on" size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2c6370]" />
                    <input className={`${inputCls} pl-10`} placeholder="123 Rescue Way, Portland, OR" type="text" value={location} onChange={e => setLocation(e.target.value)} />
                  </div>
                </Field>
              </section>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl text-base font-black text-[#d4f9ff] flex items-center justify-center gap-2.5 shadow-xl shadow-[#00656f]/25 active:scale-[0.98] transition-transform"
                style={{ background: "linear-gradient(to right,#00656f,#005861)" }}
              >
                {isEditMode ? "Save Changes" : "Submit Listing"}
                <Icon name="send" size={18} className="text-[#d4f9ff]" />
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
