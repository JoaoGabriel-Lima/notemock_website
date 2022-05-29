interface IconsComponentProps {
  icon: string;
  selectoption: (option: number, icon: string) => void;
}

const CustomIconsComponent = ({ icon, selectoption }: IconsComponentProps) => {
  return (
    <>
      <CollectionIcon
        iconname="shopping-bag"
        icontitle="Shopping Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="paper-plane"
        icontitle="Plane Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="bowl-hot"
        icontitle="Food Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="group"
        icontitle="Group Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="world"
        icontitle="World Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="heart"
        icontitle="Love Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="code-alt"
        icontitle="Code Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="leaf"
        icontitle="Leaf Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="party"
        icontitle="Party Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="run"
        icontitle="Running Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="cycling"
        icontitle="Cycling Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="bookmarks"
        icontitle="Bookmarks Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="gift"
        icontitle="Gift Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="closet"
        icontitle="Closet Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="package"
        icontitle="Package Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="dollar"
        icontitle="Dollar Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="music"
        icontitle="Music Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="math"
        icontitle="Math Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="landscape"
        icontitle="Landscape Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="bus-school"
        icontitle="Bus School Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="palette"
        icontitle="Palette Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="joystick-alt"
        icontitle="Joystick Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="atom"
        icontitle="Atom Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="award"
        icontitle="Award Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="briefcase-alt"
        icontitle="Briefcase Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="dumbbell"
        icontitle="Dumbbell Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
      <CollectionIcon
        iconname="home"
        icontitle="Home Icon"
        selectedicon={icon}
        selectoption={selectoption}
      />
    </>
  );
};

export default CustomIconsComponent;

interface CollectionIconProps {
  iconname: string;
  icontitle: string;
  selectedicon: string;
  selectoption: (option: number, icon: string) => void;
}

const CollectionIcon = ({
  iconname,
  icontitle,
  selectedicon,
  selectoption,
}: CollectionIconProps) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <button
        onClick={() => selectoption(3, iconname)}
        className={`flex justify-center items-center box-box px-6 py-3 rounded-lg bg-[#21212b] ${
          selectedicon == iconname && "border-white border-2 "
        }`}
      >
        <i className={`bx bx-${iconname} text-white text-2xl`}></i>
      </button>
      <h4 className="text-white/80 text-xs mt-2 text-center">{icontitle}</h4>
    </div>
  );
};
