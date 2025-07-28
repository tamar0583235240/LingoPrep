"use client"

import type React from "react"
import { Search } from "lucide-react"
import { Button } from "../../../shared/ui/button"
import { GridContainer } from "../../../shared/ui/GridContainer"
import { IconWrapper } from "../../../shared/ui/IconWrapper"

type Props = {
  query: string
  setQuery: (value: string) => void
  onSearch: (e: React.FormEvent) => void
  loading: boolean
}

const SearchBox: React.FC<Props> = ({ query, setQuery, onSearch, loading }) => {
  return (
    <div className="bg-gradient-to-br from-white via-primary/5 to-secondary/5 shadow-sm border-b">
      <GridContainer maxWidth="xl" mt="mt-0" mb="mb-0" padding="px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <IconWrapper size="lg" color="primary-dark" className="mb-4 mx-auto">
            <span className="text-2xl">🎯</span>
          </IconWrapper>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            מרכז חומרי ריאיונות
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            פלטפורמה מתקדמת לחיפוש וניהול חומרי ריאיונות. מצא בקלות את החומרים המתאימים לצרכים שלך
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={onSearch} className="relative">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="חפש לפי כותרת או תיאור..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pr-12 pl-4 py-3 text-lg border-2 border-gray-200 focus:border-primary rounded-xl focus:outline-none"
              />
            </div>
            <Button
              type="submit"
              variant="primary-dark"
              size="md"
              isLoading={loading}
              className="absolute left-2 top-1/2 transform -translate-y-1/2"
            >
              חפש
            </Button>
          </form>
        </div>
      </GridContainer>
    </div>
  )
}

export default SearchBox
