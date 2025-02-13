package utils

import "iter"

func Filter[T any](items iter.Seq[T], predicate func(T) bool) []T {
  var result []T

  for s := range items {
    if (predicate(s)) {
      result = append(result, s)
    }
  }

  return result;
}
