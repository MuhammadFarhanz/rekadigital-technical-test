import { Card } from "@/components/ui/card";

export function TopMenu() {
  return (
    <div className="w-96 p-6 pb-0 pt-0 space-y-6">
      <Card className="p-6 h-96 flex justify-between flex-col bg-[#6366F1] text-white">
        <h3 className="text-xl font-semibold mb-2">
          See analytics of the Customer Clearly
        </h3>

        <button className="bg-white/20 text-white text-primary px-4 py-2 rounded-lg text-base font-medium">
          See Analytics
        </button>
      </Card>

      <div className="bg-[url('/Vector.png')] bg-contain bg-no-repeat bg-[rgb(247,245,245)] h-[700px] rounded-xl p-4 bg-[center_95%]">
        <div className="flex text-2xl space-y-1 font-semibold justify-between flex-col mb-4">
          <h3 className="font-semibold">Top Menu</h3>
          <div className="text-orange-500">This Week</div>
        </div>
        <div className="text-sm text-gray-500 mb-4">10 - 12 Agustus 2023</div>
        <div className="space-y-6">
          <div className="flex items-center gap-3 bg-white p-2 rounded-md">
            <div>
              <div className="font-medium">Nasi Goreng Jamur</div>
              <div className="text-sm text-gray-500">Special Resto Pak Min</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 flex items-center justify-center text-sm text-gray-500">
              2
            </div>
            <div>
              <div className="text-sm text-gray-500">Tongseng Sapi Gurih</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 flex items-center justify-center text-sm text-gray-500">
              3
            </div>
            <div>
              <div className="text-sm text-gray-500">
                Nasi Gudeg Telur Ceker
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 flex items-center justify-center text-sm text-gray-500">
              4
            </div>
            <div>
              <div className="text-sm text-gray-500">Nasi Ayam serundeng</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 flex items-center justify-center text-sm text-gray-500">
              5
            </div>
            <div>
              <div className="text-sm text-gray-500">Nasi Goreng Seafood</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
