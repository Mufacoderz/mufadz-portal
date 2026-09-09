import ComingSoon from "../../components/public/ComingSoon";
import SEO from "../../components/public/SEO";

const ForumChat = () => {
    return (
        <div className="py-10 dark:bg-gray-900 h-full">
            <SEO
                title="Forum Chat"
                description="Forum chat komunitas Mufadz — diskusi seputar Islam dengan sesama muslim."
                path="/chat"
            />
            <ComingSoon title="Forum Chat" />
        </div>
    );
};

export default ForumChat;
