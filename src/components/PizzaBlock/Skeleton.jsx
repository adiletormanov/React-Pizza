import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
  <ContentLoader
	className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"

  >
    <circle cx="596" cy="232" r="20" />
    <circle cx="1027" cy="660" r="130" />
    <circle cx="581" cy="533" r="33" />
    <circle cx="584" cy="549" r="20" />
    <circle cx="598" cy="248" r="109" />
    <circle cx="579" cy="499" r="90" />
    <circle cx="134" cy="130" r="120" />
    <rect x="-1" y="259" rx="4" ry="4" width="280" height="21" />
    <rect x="0" y="298" rx="14" ry="14" width="280" height="70" />
    <rect x="4" y="391" rx="5" ry="5" width="103" height="37" />
    <rect x="118" y="388" rx="8" ry="8" width="158" height="43" />
  </ContentLoader>
)

export default Skeleton;
