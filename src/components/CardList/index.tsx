import { Song } from '@/types/song'
import { TopTracks } from '@/types/track'

import Card from '../Card'

const CardList = ({
  list = [],
  label,
  isRanked = false,
}: {
  list: Song[] | TopTracks[]
  label: string
  isRanked?: boolean
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="p-[0 8px 8px 8px] scrollbar-hide h-[510px] w-[360px] overflow-auto scroll-smooth rounded-lg text-sm">
        <div className="sticky top-0 flex items-center gap-2 bg-black py-[8px] pl-[8px] font-semibold text-white">
          {label}
          <span className="text-xs font-light text-white">
            Click to watch the video!
          </span>
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
