import { Song } from '@/types/song'
import { TopTracks } from '@/types/track'

import Card from '../Card'

const CardList = ({
  list,
  label,
  isRanked = false,
}: {
  list: Song[] | TopTracks[]
  label: string
  isRanked?: boolean
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-[360px] text-sm border-orange-400 border-[2px] rounded-lg p-[0 8px 8px 8px] h-[510px] overflow-auto scroll-smooth scrollbar-hide">
        <div className="flex sticky top-0 py-[8px] pl-[8px] font-semibold bg-orange-100 items-center gap-2">
          {label}
          <span className="text-xs font-light">Click to watch the video!</span>
        </div>
        {list
          .filter((item) => item.name !== '(null)')
          .sort((a, b) => Number(b.listeners) - Number(a.listeners))
          .map((item, i) => (
            <Card
              item={item}
              key={item.mbid ? item.mbid : Math.random() * 100 * i}
              rank={isRanked ? i + 1 : undefined}
            />
          ))}
      </div>
    </div>
  )
}

export default CardList
