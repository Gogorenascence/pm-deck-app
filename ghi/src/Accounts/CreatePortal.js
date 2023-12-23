import SectionCard from "../display/SectionCard";

function CreatePortal() {
    return (
        <div className="white-space">
            <h1 className="left-h1">Admin Create Portal</h1>
            <h2 className="left">Select an Item to Create</h2>
            <div className="decks-page-card-list2">
                <SectionCard
                    link="/cardcreate"
                    title="Card Create"
                    imageSRC="https://i.imgur.com/8wqd1sD.png"
                />
                <SectionCard
                    link="/cardsetcreate"
                    title="Card Set Create"
                    imageSRC="https://i.imgur.com/8wqd1sD.png"
                />
                <SectionCard
                    link="/categorycreate"
                    title="Category Create"
                    imageSRC="https://i.imgur.com/8wqd1sD.png"
                />
                <SectionCard
                    link="/cardtypecreate"
                    title="Card Type Create"
                    imageSRC="https://i.imgur.com/8wqd1sD.png"
                />
                <SectionCard
                    link="/cardtagcreate"
                    title="Tag Create"
                    imageSRC="https://i.imgur.com/8wqd1sD.png"
                />
                <SectionCard
                    link="/extraeffectcreate"
                    title="Extra Effect Create"
                    imageSRC="https://i.imgur.com/8wqd1sD.png"
                />
                <SectionCard
                    link="/reactioncreate"
                    title="Reaction Create"
                    imageSRC="https://i.imgur.com/8wqd1sD.png"
                />
            </div>
        </div>
    );
}

export default CreatePortal;
